
import { Banknote, CheckCircle, ChevronRight, Clock, Headphones, Mail, MapPin, Phone, Send, Truck, Wrench } from 'lucide-react';
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface Job {
  id: string;
  title: string;
  icon: React.ElementType;
  location: string;
  type: string;
  salary: string;
  requirements: string[];
  photoLabel: string;
}

const JOBS: Job[] = [
  {
    id: 'driver',
    title: 'International Driver',
    icon: Truck,
    location: 'Czech Republic / EU',
    type: 'Full-time',
    salary: 'From 65,000 CZK/month',
    requirements: ['Valid CE driving license', 'Minimum 2 years experience', 'Digital tachograph card', 'EU work permit'],
    photoLabel: 'Driver Photo'
  },
  {
    id: 'mechanic',
    title: 'Fleet Mechanic',
    icon: Wrench,
    location: 'Prague, CZ',
    type: 'Full-time',
    salary: 'From 55,000 CZK/month',
    requirements: ['Experience with heavy vehicles', 'Diagnostic equipment knowledge', 'Welding skills preferred', 'Driving license B (C preferred)'],
    photoLabel: 'Mechanic Photo'
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher',
    icon: Headphones,
    location: 'Prague, CZ',
    type: 'Full-time',
    salary: 'From 50,000 CZK/month',
    requirements: ['Fluent English + German or Russian', 'Experience in logistics', 'Strong communication skills', 'Flexible schedule availability'],
    photoLabel: 'Dispatcher Photo'
  }
];

const Vacancies: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'International Driver',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="vacancies">
      {/* Header & Listings Section (Light) */}
      <div className="bg-neutral-100 py-24">
        <ScrollReveal>
          <div className="container mx-auto px-4 md:px-8">
            {/* Header - Restricted Width */}
            <div className="max-w-2xl mb-16">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-2">Careers</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-6">JOIN OUR TEAM</h3>
              <p className="text-neutral-500 text-lg mb-8">
                We are always looking for dedicated professionals to join our growing fleet. Whether you are a driver, mechanic, or logistics coordinator, Trixor offers stability, competitive pay, and modern equipment.
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="block text-3xl font-black text-neutral-900">55+</span>
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Team Members</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-neutral-900">100%</span>
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Modern Fleet</span>
                </div>
              </div>
            </div>

            {/* Vacancy Cards - Full Width Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {JOBS.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">

                  {/* Photo */}
                  <div className="h-48 bg-neutral-200 overflow-hidden border-b border-neutral-100">
                    <img 
                      src={job.id === 'mechanic' ? '/trixor/images/Mechnik2.png' : job.id === 'driver' ? '/trixor/images/Trixor1.png' : '/trixor/images/TrixorWarehouse.png'}
                      alt={job.photoLabel}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary">
                        <job.icon size={24} />
                      </div>
                      <h4 className="font-bold text-xl text-neutral-900 leading-tight">{job.title}</h4>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <MapPin size={16} className="text-neutral-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Clock size={16} className="text-neutral-400" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Banknote size={16} className="text-neutral-400" />
                        <span className="font-bold text-primary">{job.salary}</span>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Requirements</p>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                              <span className="text-primary mt-0.5">•</span> {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a href="#apply" className="mt-auto w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider rounded-lg py-3 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                      Apply Now <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Application Form Section (Dark) */}
      <div id="apply" className="bg-neutral-900 py-24 border-t border-neutral-800">
        <ScrollReveal>
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left Column */}
              <div className="lg:w-5/12 text-white">
                <h2 className="text-primary font-bold tracking-widest uppercase mb-2">Apply Now</h2>
                <h3 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  START YOUR JOURNEY <br /> WITH TRIXOR.
                </h3>
                <p className="text-neutral-400 text-lg mb-8">
                  Ready to move forward? Fill out the form or contact our HR department directly. We review applications on a rolling basis.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-800 p-3 rounded-full text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Send CV to</p>
                      <a href="mailto:jobs@trixor.cz" className="text-lg font-bold hover:text-primary transition-colors">jobs@trixor.cz</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-800 p-3 rounded-full text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Call HR</p>
                      <a href="tel:+420226886224" className="text-lg font-bold hover:text-primary transition-colors">+420 226 886 224</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:w-7/12">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                        <input
                          required
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Phone Number</label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder="+420 123 456 789"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Position</label>
                        <div className="relative">
                          <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors appearance-none"
                          >
                            {JOBS.map(job => (
                              <option key={job.id} value={job.title}>{job.title}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                            <ChevronRight size={16} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-8">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Message / Link to CV</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Briefly describe your experience or paste a link to your LinkedIn/CV..."
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider rounded-lg py-4 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Send Application <Send size={18} />
                    </button>
                  </form>
                ) : (
                  <div className="bg-white p-10 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-neutral-900 mb-2">APPLICATION SENT</h4>
                    <p className="text-neutral-500 max-w-sm">
                      Thank you for your interest in joining Trixor. Our HR team will review your application for the <strong>{formData.position}</strong> position and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-400 hover:text-primary underline"
                    >
                      Send another application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Vacancies;
