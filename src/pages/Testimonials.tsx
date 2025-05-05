
import { Helmet } from 'react-helmet';
import { Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTA from '@/components/home/CTA';
import TestimonialsHero from '@/components/testimonials/TestimonialsHero';
import TestimonialCard from '@/components/testimonials/TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Joseph M.',
      location: 'Westerville, OH',
      service: 'Local Moving',
      date: 'April 15, 2024',
      text: 'I\'ve used Oasis Moving & Storage LLC twice now and they\'ve been exceptional both times. Their team arrived exactly on schedule and worked efficiently throughout the day. They took special care with our family heirlooms and even helped position furniture exactly where we wanted in the new house. The pricing was transparent with no hidden fees, and they completed our entire 3-bedroom move in just one day. Their attention to detail and customer service is truly outstanding.',
      rating: 5
    },
    {
      id: 2,
      name: 'Natalie R.',
      location: 'Columbus, OH',
      service: 'Long Distance Moving',
      date: 'March 8, 2024',
      text: 'Moving from Columbus to Cincinnati was stressful enough without worrying about the logistics, but Oasis Moving & Storage LLC made the entire process remarkably smooth. Their team was professional and respectful of our belongings, carefully wrapping everything to prevent damage during transit. Their communication was excellent throughout the entire process, providing updates and keeping to their estimated timeline. I especially appreciated how they coordinated everything with our real estate agents to ensure a seamless transition. Would definitely use them for any future moves.',
      rating: 5
    },
    {
      id: 3,
      name: 'Christopher L.',
      location: 'Dublin, OH',
      service: 'Storage Solutions',
      date: 'February 24, 2024',
      text: 'When I needed temporary storage between house closings, Oasis Moving & Storage LLC provided exactly what I needed. They carefully packed and stored all my items for nearly four months. When it was time to move into my new home, everything was in the exact same condition as when it went in. Their facility was clean, secure and climate-controlled, which was perfect for my wooden furniture and electronics. Their staff was always helpful when I needed access to retrieve items during the storage period. Could not have asked for a better storage experience.',
      rating: 5
    },
    {
      id: 4,
      name: 'Lauren W.',
      location: 'Gahanna, OH',
      service: 'Furniture Assembly & TV Mounting',
      date: 'January 17, 2024',
      text: 'After moving into my new home, I hired Oasis Moving & Storage LLC for furniture assembly and TV mounting. Their technician was punctual, professional, and incredibly skilled. He assembled my complex entertainment center, dining table, and mounted two TVs with perfect precision in under 4 hours. Everything was perfectly level and secure. He even cleaned up all the packaging and made sure I was completely satisfied before leaving. The service was excellent value for money and saved me days of frustration trying to do it myself.',
      rating: 5
    },
    {
      id: 5,
      name: 'Andrew T.',
      location: 'Westerville, OH',
      service: 'Local Moving',
      date: 'December 5, 2023',
      text: 'Oasis Moving & Storage LLC handled our complicated move with exceptional care and professionalism. We had several delicate items, including a piano and antique furniture that required special attention. Their crew arrived with all the necessary equipment and protective materials to ensure everything was transported safely. They were methodical in their approach, making sure each item was properly secured before loading. They worked quickly without sacrificing quality, and the final price matched the quote exactly. I was thoroughly impressed with their expertise and would recommend them to anyone moving in the Westerville area.',
      rating: 5
    },
    {
      id: 6,
      name: 'Jessica K.',
      location: 'Upper Arlington, OH',
      service: 'Junk Removal',
      date: 'November 18, 2023',
      text: 'After clearing out my parents\' home, I needed help with removing a substantial amount of items. Oasis Moving & Storage LLC was prompt, professional, and reasonably priced for this big job. Their team was respectful and efficient, removing everything from old furniture to boxes of miscellaneous items. I appreciated that they took the time to sort items that could potentially be donated rather than simply taking everything to be disposed of. They even swept the areas clean afterward. Their service made a difficult situation much easier to handle, and I would certainly use them again for any future cleanouts.',
      rating: 5
    },
    {
      id: 7,
      name: 'Michelle G.',
      location: 'Reynoldsburg, OH',
      service: 'Furniture Assembly',
      date: 'October 22, 2023',
      text: 'I recently purchased several pieces of furniture online and was dreading the assembly process. Oasis Moving & Storage LLC saved me so much time and frustration! Their furniture assembly specialist arrived with all the necessary tools and had everything assembled in a fraction of the time it would have taken me. My sectional sofa, bed frame, and dining set were perfectly assembled with no scratches or issues. The technician was friendly, experienced, and even helped position the furniture exactly where I wanted it. The service was absolutely worth every penny for the time and stress saved.',
      rating: 5
    },
    {
      id: 8,
      name: 'Daniel B.',
      location: 'Worthington, OH',
      service: 'Local Moving & Storage',
      date: 'September 30, 2023',
      text: 'We used Oasis Moving & Storage LLC for both moving and storage during our extensive home renovation. They accommodated our changing timeline with no issues, which was a huge relief during an already stressful renovation. Our items were carefully packed, inventoried, and stored in their climate-controlled facility, then delivered back to us in perfect condition when our renovation was complete. The crew was friendly and professional during both the pickup and delivery. Their flexibility and attention to detail made a complicated logistics situation much easier to manage. I would highly recommend their services to anyone needing reliable movers in the Columbus area.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Customer Testimonials | Oasis Moving & Storage LLC</title>
        <meta name="description" content="Read what our satisfied customers have to say about their experiences with Oasis Moving & Storage LLC's professional services." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <TestimonialsHero />
          
          {/* Testimonials Grid */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </div>
            </div>
          </section>
          
          {/* Review Sources */}
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6">Find Us On Review Platforms</h2>
                <p className="text-muted-foreground mb-8">
                  See what our clients are saying about us across various review platforms.
                </p>
                
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-xl font-bold mb-2">Google</div>
                    <div className="flex">
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-sm mt-1">5/5</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-xl font-bold mb-2">Yelp</div>
                    <div className="flex">
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-sm mt-1">5/5</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-xl font-bold mb-2">Facebook</div>
                    <div className="flex">
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-sm mt-1">5/5</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-xl font-bold mb-2">HomeAdvisor</div>
                    <div className="flex">
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                      <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                    </div>
                    <p className="text-sm mt-1">5/5</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Testimonials;
