<script setup>
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-vue-next";

</script>
<template>
    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="container mx-auto px-4 md:px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div class="lg:col-span-2">
            <a href="#" class="text-2xl font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text inline-block mb-4">
              Azapal
            </a>
            <p class="text-gray-600 mb-4 max-w-md">
              Azapal is a secure payment and delivery platform that connects buyers, 
              sellers, and delivery services for safer online transactions.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-500 hover:text-azapal-purple transition-colors">
                <Facebook size="20" />
              </a>
              <a href="#" class="text-gray-500 hover:text-azapal-purple transition-colors">
                <Twitter size="20" />
              </a>
              <a href="#" class="text-gray-500 hover:text-azapal-purple transition-colors">
                <Instagram size="20" />
              </a>
              <a href="#" class="text-gray-500 hover:text-azapal-purple transition-colors">
                <Linkedin size="20" />
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Product</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Features</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Pricing</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Integrations</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">About Us</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Careers</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Partners</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Resources</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Blog</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Support</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Documentation</a></li>
              <li><a href="#" class="text-gray-600 hover:text-azapal-purple transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 text-sm">&copy; {{new Date().getFullYear()}} Azapal. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-600 hover:text-azapal-purple text-sm transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-600 hover:text-azapal-purple text-sm transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-600 hover:text-azapal-purple text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
</template>
<style></style>