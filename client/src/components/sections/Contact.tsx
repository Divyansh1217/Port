import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiKaggle } from "react-icons/si";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // In a real application, this would trigger a download of the CV file
    alert("CV download would be triggered here");
  };

  return (
    <motion.section 
      id="contact" 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Get In Touch</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Let's collaborate on exciting projects together. Feel free to reach out to me through any of these channels.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-xl font-semibold font-poppins mb-6 text-primary dark:text-primary">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary">
                    <Mail />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                    <a 
                      href="mailto:divyansh27aggarwal@gmail.com" 
                      className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      divyansh27aggarwal@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary">
                    <Phone />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                    <a 
                      href="tel:+918920942832" 
                      className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      +91 8920942832
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary">
                    <MapPin />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                    <p className="text-gray-800 dark:text-gray-200">New Delhi, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary">
                    <Globe />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Social Profiles</h4>
                    <div className="flex space-x-3 mt-2">
                      <a 
                        href="https://www.linkedin.com/in/divyansh279/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" 
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://github.com/Divyansh1217" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" 
                        aria-label="GitHub"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://www.kaggle.com/divyanshagg27" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" 
                        aria-label="Kaggle"
                      >
                        <SiKaggle className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild variant="default" className="inline-flex items-center">
                  <a href="#" onClick={handleDownloadCV}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-xl font-semibold font-poppins mb-6 text-primary dark:text-primary">Send Me a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            {...field} 
                            className="bg-white dark:bg-background text-gray-800 dark:text-gray-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            type="email" 
                            {...field} 
                            className="bg-white dark:bg-background text-gray-800 dark:text-gray-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter subject" 
                            {...field} 
                            className="bg-white dark:bg-background text-gray-800 dark:text-gray-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            rows={4} 
                            {...field} 
                            className="bg-white dark:bg-background text-gray-800 dark:text-gray-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
