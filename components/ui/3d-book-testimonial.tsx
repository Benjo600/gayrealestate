'use client'
import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useMediaQuery } from '@react-hook/media-query';
import { Sparkles } from 'lucide-react';

interface Testimonial {
  image?: string;
  text: string;
  name: string;
  jobtitle: string;
  rating: number;
}

interface ComponentProps {
  testimonials: Testimonial[];
  agentImage: string;
  agentName: string;
}

export const BookTestimonial = ({ testimonials, agentImage, agentName }: ComponentProps) => {

  const book = useRef<any>(null);

  const isSmallScreen = useMediaQuery('(min-width: 640px)');
  const smallerDevice = !isSmallScreen;

  return (
    <div className="w-full text-black h-[550px] flex justify-center items-center py-10 overflow-hidden">
      <HTMLFlipBook
        ref={book}
        width={300}
        height={450}
        showCover={true}
        usePortrait={smallerDevice}
        onFlip={(e: any) => console.log(e.data)}
        onChangeState={(e: any) => console.log(e.data)}
        className="book-container shadow-2xl"
        style={{}}
        startPage={0}
        size={'fixed'}
        minWidth={300}
        maxWidth={300}
        minHeight={450}
        maxHeight={450}
        drawShadow={true}
        flippingTime={1000}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {/* Cover Page */}
        <div className="relative bg-gradient-to-br from-slate-900 to-black border-l-8 border-gold-500 rounded-r-lg p-8 text-white flex flex-col items-center justify-center shadow-2xl cursor-grab h-full overflow-hidden">
          {/* Subtle background decoration - Reduced Glare */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <div className="flex flex-col items-center relative z-10 w-full">
            <div className="relative mb-6">
              {/* Reduced ring glare */}
              <div className="absolute -inset-1 bg-gold-400/10 rounded-full blur-sm"></div>
              <div className="w-32 h-32 rounded-full overflow-hidden border border-gold-500/50 shadow-lg">
                <img 
                  src={agentImage} 
                  alt={agentName} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            <h1 className="text-3xl font-display font-bold text-center tracking-tight text-white mb-1">
              {agentName}
            </h1>
            <div className="w-10 h-px bg-gold-500/30 mb-4"></div>
            <h2 className="text-sm font-display font-medium text-gold-500 tracking-[0.2em] uppercase text-center">
              Client Testimonials
            </h2>
          </div>

          <div className="mt-auto pt-8 flex flex-col items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
               <Sparkles className="w-3 h-3 text-gold-400/80" />
               <span className="text-[9px] uppercase tracking-widest text-slate-300">Click edge or drag to flip</span>
             </div>
             <p className="text-[10px] text-gold-500/40 font-medium italic">
               Interactive Portfolio
             </p>
          </div>
          
          <div className="absolute bottom-4 right-4 text-[7px] text-slate-700 uppercase tracking-widest font-bold">
            © 2026
          </div>
        </div>

        {/* Testimonial Pages */}
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full h-full flex flex-col bg-white border-l border-slate-100 shadow-sm relative p-8">
            <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-300">
              {index + 1}
            </div>
            
            <div className="flex flex-col items-center mt-10">
              <div className="text-center">
                <h3 className="font-display font-bold text-slate-900 text-xl leading-tight">{testimonial.name}</h3>
                <p className="text-brand-600 text-[11px] font-semibold uppercase tracking-wider mt-1 bg-slate-100 px-3 py-1 rounded-full inline-block">
                  {testimonial.jobtitle}
                </p>
              </div>
            </div>

            <div className="mt-8 flex-1 flex flex-col justify-center">
              <div className="relative">
                <span className="absolute -top-6 -left-2 text-6xl text-slate-100 font-serif leading-none select-none">“</span>
                <p className="text-slate-700 text-sm leading-relaxed text-center font-medium italic relative z-10">
                  {testimonial.text}
                </p>
                <span className="absolute -bottom-10 -right-2 text-6xl text-slate-100 font-serif leading-none select-none">”</span>
              </div>
            </div>

            <div className="mt-auto pt-6 flex justify-center items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={i < testimonial.rating ? "#FFA800" : "#E2E8F0"} 
                  className="w-5 h-5"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
