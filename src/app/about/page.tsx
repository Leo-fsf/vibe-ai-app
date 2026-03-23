'use client'

import { Users, Globe, Target, Zap, Rocket, ArrowRight, Star } from 'lucide-react'

export default function About() {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us</h1>
        <p className="text-gray-600">
          Dedicated to using AI technology to lower the barrier to creation
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-[#1677FF]" />
          Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Through AI technology, dramatically lower the barrier to content creation, software development, and technical work. Enable more creators, developers, and freelancers to focus on creativity itself, delegate repetitive work to AI, unleash creativity, improve productivity, and make creation and development simpler, more efficient, and more interesting.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We believe AI should be a tool to enhance human capabilities, not a replacement.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🚀 Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Build the world's largest AI application platform, connecting creators and developers globally. Build a powerful AI tool ecosystem, enabling everyone to use AI to bring ideas to life. Our goal is to become the next-generation AI-native infrastructure.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Starting from the AI agent plugin market, to complete AI workflows, we hope to make AI the best partner for everyone's work and creativity.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🎨 Simplicity First
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Clean, clear interface with clear information hierarchy, reducing cognitive load. We believe the best design is invisible design.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🤝 User First
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Always user-centric, responding quickly to user needs, providing the best experience. We listen to user feedback and continuously optimize the product.
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🚀 Continuous Innovation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Continuously exploring the frontiers of AI technology, keeping the product cutting-edge. Fast iteration, releasing new features weekly.
            </p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#1677FF]" />
          Our Journey
        </h2>
        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              1
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                January 2024
              </div>
              <p className="text-gray-600">
                Vibe AI officially launched, beginning the journey to build an AI tool platform
              </p>
              <div className="text-sm text-gray-500 mt-2">
                First AI agent released
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
              2
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                March 2024
              </div>
              <p className="text-gray-600">
                AI agent marketplace reached 100+, users exceeded 100,000
              </p>
              <div className="text-sm text-gray-500 mt-2">
                Agent analysis feature launched
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
              3
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                June 2024
              </div>
              <p className="text-gray-600">
                Enterprise version launched, supporting team collaboration and multi-agent orchestration
              </p>
              <div className="text-sm text-gray-500 mt-2">
                Team space feature launched
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
              4
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                September 2024
              </div>
              <p className="text-gray-600">
                Open API platform launched, supporting third-party developer integration
              </p>
              <div className="text-sm text-gray-500 mt-2">
                Developer center launched
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-[#1677FF]" />
          Our Team
        </h2>
        <p className="text-gray-600 mb-6">
          We are a passionate and creative team dedicated to changing the world with AI technology
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Founder */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="w-16 h-16 rounded-full bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-3">
              Cloud
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Founder & CEO</h3>
            <p className="text-sm text-gray-500">
              AI Expert, Full-stack Developer
            </p>
          </div>

          {/* Tech Lead */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="w-16 h-16 rounded-full bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-xl mb-3">
              🧠
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tech Lead</h3>
            <p className="text-sm text-gray-500">
              AI Algorithm Engineer, System Architect
            </p>
          </div>

          {/* Product Lead */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
            <div className="w-16 h-16 rounded-full bg-white rounded-full flex items-center justify-center text-pink-600 font-bold text-xl mb-3">
              ✨
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Lead</h3>
            <p className="text-sm text-gray-500">
              UI/UX Designer, User Experience Expert
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="card bg-gradient-to-r from-[#1677FF] to-[#a78bff] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Join Our Team
        </h2>
        <p className="text-white/80 mb-6">
          We are looking for passionate engineers and product designers to change the world together
        </p>
        <button className="bg-white text-[#1677FF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          View Openings
        </button>
      </div>
    </div>
  )
}
