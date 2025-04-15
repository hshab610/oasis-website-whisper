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
      name: 'Sarah Johnson',
      location: 'Westerville, OH',
      service: 'Local Moving',
      date: 'March 15, 2023',
      text: 'Oasis Moving made our local move so easy! The team was professional, efficient, and careful with all of our belongings. I was especially impressed with how they handled our antique furniture. The pricing was transparent with no surprises, and they finished right on schedule. I would definitely recommend their services to anyone moving in the area!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      location: 'Columbus, OH',
      service: 'Long Distance Moving',
      date: 'February 3, 2023',
      text: 'I was dreading my move across the state, but Oasis Moving turned it into a stress-free experience. Their pricing was straightforward, and the movers were friendly and hardworking. They took great care with all my belongings, especially my piano which was a concern for me. They even finished earlier than expected! Communication throughout the process was excellent.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Chen',
      location: 'Dublin, OH',
      service: 'Storage Solutions',
      date: 'January 12, 2023',
      text: 'The storage solutions provided by Oasis Moving were perfect for my situation. I needed to store my belongings for three months between moves, and everything was kept in excellent condition. The facility was clean and secure, and the staff was helpful whenever I needed to access my items. The pickup and delivery were seamless, making the whole process convenient.',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Williams',
      location: 'Gahanna, OH',
      service: 'Furniture Assembly & TV Mounting',
      date: 'April 22, 2023',
      text: 'I hired Oasis for furniture assembly and TV mounting services after moving into my new apartment. The team was punctual, professional, and did an excellent job with everything. They assembled all my IKEA furniture quickly and correctly, and my TV was mounted perfectly. They were careful not to damage my walls and cleaned up afterward. Great service!',
      rating: 4,
    },
    {
      id: 5,
      name: 'Jessica Thompson',
      location: 'Westerville, OH',
      service: 'Local Moving',
      date: 'May 10, 2023',
      text: 'Our experience with Oasis Moving was outstanding from start to finish. The crew arrived on time and worked efficiently throughout the day. They were respectful of our home and belongings, using proper protection for furniture and doorways. The final cost matched the estimate we were given, which was refreshing. I would use their services again without hesitation.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Robert Kim',
      location: 'Upper Arlington, OH',
      service: 'Junk Removal',
      date: 'March 30, 2023',
      text: 'I used Oasis Moving for junk removal after cleaning out my parents' home. They were prompt, courteous, and efficient. They removed everything I needed and even swept the area afterward. The price was fair for the amount of work involved, and they made sure to dispose of items responsibly when possible. Highly recommend their junk removal service.',
      rating: 5,
    },
    {
      id: 7,
      name: 'Amanda Garcia',
      location: 'Reynoldsburg, OH',
      service: 'Furniture Assembly',
      date: 'June 5, 2023',
      text: 'I had several pieces of furniture that needed assembly, and Oasis Moving did a fantastic job. The technician was knowledgeable and worked quickly but carefully. He even helped move the assembled pieces to their final locations. The flat rate pricing was reasonable and worth every penny for the time and frustration saved. Will definitely use again!',
      rating: 5,
    },
    {
      id: 8,
      name: 'Thomas Bennett',
      location: 'Worthington, OH',
      service: 'Local Moving & Storage',
      date: 'February 18, 2023',
      text: 'We used Oasis for both moving and temporary storage during our home renovation. They were very accommodating with our changing timeline and made the process easy. Our items were well-protected in storage and returned in perfect condition. The moving crew was professional and efficient both during the move-out and move-in phases. Great experience overall.',
      rating: 4,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Customer Testimonials | Oasis Moving & Storage</title>
        <meta name="description" content="Read what our satisfied customers have to say about their experiences with Oasis Moving & Storage's professional services." />
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
                  Check out more customer reviews on these popular platforms.
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
                    <p className="text-sm mt-1">4.9/5 (253 reviews)</p>
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
                    <p className="text-sm mt-1">4.8/5 (127 reviews)</p>
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
                    <p className="text-sm mt-1">4.9/5 (85 reviews)</p>
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
                    <p className="text-sm mt-1">4.8/5 (42 reviews)</p>
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
