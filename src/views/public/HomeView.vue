<template>
  <div>
    <AppNavbar />
    <main>
      <HeroSection />
      <ProjectsSection />
      <VisionSection />
      <TeamSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppNavbar from '@/components/common/AppNavbar.vue'
import HeroSection from '@/components/public/HeroSection.vue'
import ProjectsSection from '@/components/public/ProjectsSection.vue'
import VisionSection from '@/components/public/VisionSection.vue'
import TeamSection from '@/components/public/TeamSection.vue'
import ContactSection from '@/components/public/ContactSection.vue'
import FooterSection from '@/components/public/FooterSection.vue'

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1 })
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  }, 100)
})
</script>