@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-[#1677FF] text-white rounded-lg hover:bg-[#5566FF] hover:shadow-[0_2px_12px_rgba(37,99,255,0.3)] transition-all font-medium;
  }
  
  .btn-secondary {
    @apply px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all font-medium;
  }
  
  .card {
    @apply bg-white rounded-xl p-6 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all;
  }
  
  .nav-item {
    @apply flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F7F8FA] cursor-pointer transition-colors font-medium;
  }
  
  .nav-item.active {
    @apply bg-[#1677FF] text-white;
  }
  
  .badge {
    @apply px-2.5 py-1 bg-white rounded-full text-xs font-medium;
  }
  
  .section-title {
    @apply text-lg font-bold text-gray-900 mb-4;
  }
  
  .input-field {
    @apply px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF] placeholder:text-gray-400;
  }
}
