
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
      name: 'Jennifer M.',
      location: 'Westerville, OH',
      service: 'Local Moving',
      date: 'March 15, 2023',
      text: 'I cannot recommend Oasis Moving enough! They arrived exactly when they said they would and handled all our furniture with extreme care. The team was courteous, efficient, and went above and beyond to ensure nothing was damaged. Their pricing was transparent with no hidden fees. Our entire 3-bedroom house was moved in one day without any issues. Would definitely use them again!',
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos R.',
      location: 'Columbus, OH',
      service: 'Long Distance Moving',
      date: 'February 10, 2023',
      text: 'Moving from Columbus to Cincinnati was stressful enough, but Oasis Moving made the process so much easier. The crew was professional and respectful of our belongings. They wrapped everything meticulously and nothing was damaged in transit. Communication was excellent throughout the entire process, and they kept to their estimated timeline. I would definitely use them again for any future moves.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sophia L.',
      location: 'Dublin, OH',
      service: 'Storage Solutions',
      date: 'January 22, 2023',
      text: 'I needed temporary storage between apartment leases, and Oasis Moving provided the perfect solution. They carefully packed and stored all my items for three months. When it was time to move into my new place, everything was in the exact same condition as when it went in. Their facility was clean and secure, and their staff was helpful whenever I needed access to my items. Great experience overall!',
      rating: 5
    },
    {
      id: 4,
      name: 'Marcus W.',
      location: 'Gahanna, OH',
      service: 'Furniture Assembly & TV Mounting',
      date: 'April 3, 2023',
      text: 'After moving into my new home, I hired Oasis for furniture assembly and TV mounting. Their technician arrived on time and was incredibly efficient. He assembled my entertainment center, dining table, and mounted two TVs in under 4 hours! Everything was perfectly level and secure. He even cleaned up all the packaging and made sure I was completely satisfied before leaving. Excellent service at a fair price.',
      rating: 5
    },
    {
      id: 5,
      name: 'Rebecca T.',
      location: 'Westerville, OH',
      service: 'Local Moving',
      date: 'May 19, 2023',
      text: 'Oasis Moving exceeded all expectations during our recent home move. From the initial quote to the final box placement, their service was impeccable. The movers treated our belongings as if they were their own, using proper padding and securing techniques for everything. They worked quickly without sacrificing quality, and the price matched the quote exactly. Would recommend them to anyone in the Westerville area!',
      rating: 5
    },
    {
      id: 6,
      name: 'Daniel K.',
      location: 'Upper Arlington, OH',
      service: 'Junk Removal',
      date: 'March 11, 2023',
      text: "After clearing out my parents' basement, I needed help with junk removal. Oasis Moving was prompt, professional, and reasonably priced. The team was respectful and efficient, removing everything from old furniture to boxes of miscellaneous items. They even swept up afterward! I appreciated that they sorted items for donation when possible instead of taking everything to the landfill. Will definitely use them again for future cleanouts.",
      rating: 5
    },
    {
      id: 7,
      name: 'Olivia G.',
      location: 'Reynoldsburg, OH',
      service: 'Furniture Assembly',
      date: 'June 7, 2023',
      text: 'I ordered several pieces of furniture online and dreaded the assembly process. Oasis Moving saved the day! Their furniture assembly specialist arrived with all the necessary tools and had everything assembled in a fraction of the time it would have taken me. My sectional sofa, bed frame, and dining set were perfectly assembled with no scratches or issues. Worth every penny for the time and frustration saved!',
      rating: 5
    },
    {
      id: 8,
      name: 'Jason B.',
      location: 'Worthington, OH',
      service: 'Local Moving & Storage',
      date: 'February 25, 2023',
      text: 'We used Oasis for both moving and storage during our home renovation. They accommodated our changing schedule with no issues, which was a huge relief during an already stressful time. Our items were carefully packed and stored, then delivered back to us in perfect condition when our renovation was complete. The crew was friendly and professional both times. I would highly recommend their services to anyone needing reliable movers in the Columbus area.',
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
