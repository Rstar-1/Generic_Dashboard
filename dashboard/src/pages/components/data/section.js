import {
  DSBKO,
  SPLEDO,
  ENGIN,
  NEXTG,
  GOLDN,
  MEDOX,
  SPRIT,
  LUMIN,
  IMSALE,
  KAIOM,
  TOFFE,
} from "../../../utils/imageResolver";

const SECTION_TEMPLATES = {
  website: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16 flex items-center justify-between gap-12">
      <div className="flex-1">
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-light-primary text-primary">{badge}</span>
        <h2 className="headmini-text font-700 text-dark mt-8">{title}</h2>
        <p className="small-text text-gray mt-6">${desc || "Empower your business with next-generation digital solutions."}</p>
        <div className="flex items-center gap-10 mt-12">
          <button className="px-14 py-8 rounded-5 bg-primary text-white font-500 mini-text">Get Started</button>
          <button className="px-14 py-8 rounded-5 border text-dark font-500 mini-text">Learn More</button>
        </div>
      </div>
      <div className="flex-1 rounded-5 overflow-hidden bg-dark p-8">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-200 object-contain flex" />
      </div>
    </div>`,

  hero: ({ title, badge, img, desc }) => `    <div className="relative w-full rounded-5 bg-dark p-20 text-center text-white overflow-hidden">
      <span className="mini-text font-600 px-10 py-4 rounded-20 bg-primary text-white inline-block mb-10">{badge}</span>
      <h1 className="headmini-text font-700 text-white mb-8">{title}</h1>
      <p className="small-text text-gray mb-14 max-w-xl mx-auto">${desc || "High-impact hero banner with engaging visuals, live metrics, and interactive triggers."}</p>
      <div className="flex items-center justify-center gap-10 mb-14">
        <button className="px-16 py-8 rounded-5 bg-primary text-white font-500 mini-text">Explore Now</button>
        <button className="px-16 py-8 rounded-5 bg-white text-dark font-500 mini-text">View Demo</button>
      </div>
      <div className="rounded-5 overflow-hidden max-w-lg mx-auto">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-180 object-contain flex" />
      </div>
    </div>`,

  banner: ({ title, badge, img, desc }) => `    <div className="w-full bg-light-primary rounded-5 p-16 flex items-center justify-between gap-12">
      <div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-primary text-white">{badge}</span>
        <h3 className="headmini-text font-600 text-dark mt-6">{title}</h3>
        <p className="mini-text text-gray mt-4">${desc || "Special promotional showcase layout with immediate conversion triggers."}</p>
      </div>
      <div className="flex items-center gap-12">
        <Image src={resolveImagePath("${img}")} alt={title} className="h-100 object-contain flex" />
        <button className="px-14 py-8 rounded-5 bg-primary text-white font-500 mini-text">Claim Offer</button>
      </div>
    </div>`,

  about: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16 grid-cols-2 gap-16 items-center">
      <div className="rounded-5 overflow-hidden bg-dark p-10">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-200 object-contain flex" />
      </div>
      <div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-light-primary text-primary">{badge}</span>
        <h3 className="headmini-text font-600 text-dark mt-6">{title}</h3>
        <p className="mini-text text-gray mt-6">${desc || "Empowering organizations worldwide with modern, scalable, and intuitive digital tools."}</p>
        <div className="flex items-center gap-14 mt-12">
          <div><h4 className="headmini-text font-700 text-primary">10+</h4><p className="mini-text text-gray">Years Exp</p></div>
          <div><h4 className="headmini-text font-700 text-primary">250k+</h4><p className="mini-text text-gray">Users</p></div>
          <div><h4 className="headmini-text font-700 text-primary">99.9%</h4><p className="mini-text text-gray">Satisfaction</p></div>
        </div>
      </div>
    </div>`,

  category: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-14 border hover-shadow transition-all">
      <div className="flex items-center justify-between mb-10">
        <h4 className="small-text font-600 text-dark">{title}</h4>
        <span className="mini-text font-600 px-8 py-2 rounded-20 bg-forth text-dark">{badge}</span>
      </div>
      <div className="rounded-5 overflow-hidden bg-dark p-8 mb-10">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-140 object-contain flex" />
      </div>
      <p className="mini-text text-gray">${desc || "Curated collection featuring trending high-demand products and services."}</p>
    </div>`,

  product: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-14 border">
      <div className="relative rounded-5 overflow-hidden bg-dark p-10 mb-10">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-160 object-contain flex" />
        <span className="absolute top-0 right-0 m-8 mini-text font-600 px-8 py-4 rounded-20 bg-primary text-white">{badge}</span>
      </div>
      <h4 className="small-text font-600 text-dark">{title}</h4>
      <p className="mini-text text-gray mt-4">${desc || "Premium enterprise solution engineered for modern productivity."}</p>
      <div className="flex items-center justify-between mt-10 bordt pt-8">
        <span className="small-text font-700 text-dark">₹4,999</span>
        <button className="px-12 py-6 rounded-5 bg-primary text-white mini-text font-500">Add to Cart</button>
      </div>
    </div>`,

  offer: ({ title, badge, img, desc }) => `    <div className="w-full rounded-5 p-16 bg-white border flex items-center justify-between gap-12">
      <div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-danger text-white">Limited Offer • {badge}</span>
        <h3 className="headmini-text font-700 text-dark mt-8">{title}</h3>
        <p className="mini-text text-gray mt-4">${desc || "Save up to 40% on annual enterprise plans this quarter."}</p>
        <button className="mt-10 px-14 py-8 rounded-5 bg-primary text-white font-500 mini-text">Claim Deal</button>
      </div>
      <div className="rounded-5 bg-dark p-8">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-160 h-140 object-contain flex" />
      </div>
    </div>`,

  compare: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16 border">
      <div className="flex items-center justify-between mb-12">
        <div><h3 className="headmini-text font-600 text-dark">{title}</h3><p className="mini-text text-gray">Plan Comparison & Tiers</p></div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-primary text-white">{badge}</span>
      </div>
      <div className="grid-cols-2 gap-12 mb-10">
        <div className="p-10 rounded-5 border bg-forth"><h5 className="mini-text font-600">Standard</h5><p className="small-text font-700 mt-4">₹999/mo</p></div>
        <div className="p-10 rounded-5 border border-primary bg-light-primary"><h5 className="mini-text font-600 text-primary">Pro Enterprise</h5><p className="small-text font-700 text-primary mt-4">₹2,499/mo</p></div>
      </div>
      <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-120 object-contain flex bg-dark rounded-5 p-6" />
    </div>`,

  features: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16">
      <div className="text-center mb-14">
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-light-primary text-primary">{badge}</span>
        <h3 className="headmini-text font-600 text-dark mt-6">{title}</h3>
        <p className="mini-text text-gray max-w-md mx-auto mt-4">${desc || "Key platform capabilities designed to supercharge your workflow."}</p>
      </div>
      <div className="rounded-5 overflow-hidden bg-dark p-12 mb-12">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-180 object-contain flex" />
      </div>
      <div className="grid-cols-3 gap-12">
        <div className="p-10 rounded-5 border"><h5 className="mini-text font-600">Fast Deploy</h5><p className="mini-text text-gray mt-4">Automated CI/CD rollout pipelines.</p></div>
        <div className="p-10 rounded-5 border"><h5 className="mini-text font-600">Zero Latency</h5><p className="mini-text text-gray mt-4">Edge caching with sub-millisecond response.</p></div>
        <div className="p-10 rounded-5 border"><h5 className="mini-text font-600">Role Security</h5><p className="mini-text text-gray mt-4">Granular enterprise access authorizations.</p></div>
      </div>
    </div>`,

  metrics: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16">
      <div className="flex items-center justify-between mb-12">
        <div><h3 className="headmini-text font-600 text-dark">{title}</h3><p className="mini-text text-gray">${desc || "Live verified telemetry & growth metrics"}</p></div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-success text-white">{badge}</span>
      </div>
      <div className="grid-cols-4 gap-12 mb-14">
        <div className="p-12 rounded-5 bg-forth text-center"><h3 className="headmini-text font-700 text-primary">99.99%</h3><p className="mini-text text-gray mt-4">Uptime</p></div>
        <div className="p-12 rounded-5 bg-forth text-center"><h3 className="headmini-text font-700 text-success">1.2M+</h3><p className="mini-text text-gray mt-4">Queries</p></div>
        <div className="p-12 rounded-5 bg-forth text-center"><h3 className="headmini-text font-700 text-warning">&lt;45ms</h3><p className="mini-text text-gray mt-4">Latency</p></div>
        <div className="p-12 rounded-5 bg-forth text-center"><h3 className="headmini-text font-700 text-danger">500+</h3><p className="mini-text text-gray mt-4">Partners</p></div>
      </div>
      <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-140 object-contain flex bg-dark rounded-5 p-8" />
    </div>`,

  testimonials: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16 border">
      <span className="mini-text font-600 px-8 py-4 rounded-20 bg-light-primary text-primary">{badge}</span>
      <h3 className="headmini-text font-600 text-dark mt-6">{title}</h3>
      <div className="flex items-center gap-6 text-warning mt-6">★★★★★</div>
      <p className="small-text text-dark font-500 italic mt-8">"${desc || "This platform transformed our operational workflow and doubled our delivery speed."}"</p>
      <div className="flex items-center justify-between mt-12 bordt pt-8">
        <div><h5 className="mini-text font-600 text-dark">Verified Client</h5><p className="mini-text text-gray">Enterprise Engineering Lead</p></div>
        <Image src={resolveImagePath("${img}")} alt={title} className="h-50 object-contain flex rounded-full" />
      </div>
    </div>`,

  contact: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16 grid-cols-2 gap-16 items-center">
      <div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-primary text-white">{badge}</span>
        <h3 className="headmini-text font-600 text-dark mt-6">{title}</h3>
        <p className="mini-text text-gray mt-4">${desc || "Have questions or need enterprise support? Send us a message."}</p>
        <div className="flex flex-column gap-10 mt-10">
          <input placeholder="Your Name" className="p-8 border rounded-5 mini-text" />
          <input placeholder="Email Address" className="p-8 border rounded-5 mini-text" />
          <textarea placeholder="Your Message" rows="3" className="p-8 border rounded-5 mini-text" />
          <button className="px-14 py-8 rounded-5 bg-primary text-white font-500 mini-text">Send Message</button>
        </div>
      </div>
      <div className="rounded-5 overflow-hidden bg-dark p-10">
        <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-220 object-contain flex" />
      </div>
    </div>`,

  patch: ({ title, badge, img, desc }) => `    <div className="w-full bg-dark rounded-5 p-14 flex items-center justify-between gap-12">
      <div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-success text-white">Verified • {badge}</span>
        <h4 className="small-text font-600 text-white mt-6">{title}</h4>
        <p className="mini-text text-gray mt-2">${desc || "Trusted partner badge and security certification ribbon."}</p>
      </div>
      <Image src={resolveImagePath("${img}")} alt={title} className="h-70 object-contain flex" />
    </div>`,

  faq: ({ title, badge, img, desc }) => `    <div className="w-full bg-white rounded-5 p-16">
      <div className="flex items-center justify-between mb-12">
        <div><h3 className="headmini-text font-600 text-dark">{title}</h3><p className="mini-text text-gray">${desc || "Frequently Asked Questions & Support Hub"}</p></div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-primary text-white">{badge}</span>
      </div>
      <div className="flex flex-column gap-8 mb-12">
        <div className="p-10 border rounded-5"><h5 className="mini-text font-600 text-dark">How do I integrate custom section layouts?</h5><p className="mini-text text-gray mt-4">Copy the component JSX code and drop it into your React project.</p></div>
        <div className="p-10 border rounded-5"><h5 className="mini-text font-600 text-dark">Can I customize colors and responsive tokens?</h5><p className="mini-text text-gray mt-4">All classes adhere to the global design token palette.</p></div>
      </div>
      <Image src={resolveImagePath("${img}")} alt={title} className="w-full h-120 object-contain flex bg-dark rounded-5 p-6" />
    </div>`,

  cta: ({ title, badge, img, desc }) => `    <div className="w-full rounded-5 bg-primary p-20 text-center text-white">
      <span className="mini-text font-600 px-10 py-4 rounded-20 bg-white text-primary inline-block mb-10">{badge}</span>
      <h2 className="headmini-text font-700 text-white mb-6">{title}</h2>
      <p className="small-text text-white opacity-90 max-w-lg mx-auto mb-14">${desc || "Join thousands of teams scaling their products with modular UI sections."}</p>
      <div className="flex items-center justify-center gap-10 max-w-md mx-auto">
        <input placeholder="Enter work email..." className="p-8 rounded-5 bg-white text-dark flex-1 mini-text" />
        <button className="px-16 py-8 rounded-5 bg-dark text-white font-600 mini-text">Get Started</button>
      </div>
    </div>`,

  footer: ({ title, badge, img, desc }) => `    <footer className="w-full bg-dark text-white rounded-5 p-20">
      <div className="flex items-center justify-between bordb pb-12 mb-12">
        <div><h3 className="headmini-text font-700 text-white">{title}</h3><p className="mini-text text-gray">Enterprise UI System</p></div>
        <span className="mini-text font-600 px-8 py-4 rounded-20 bg-white text-dark">{badge}</span>
      </div>
      <div className="grid-cols-4 gap-12 mini-text text-gray mb-12">
        <div><h5 className="font-600 text-white mb-6">Product</h5><p className="mb-4">Features</p><p className="mb-4">Templates</p><p>Integrations</p></div>
        <div><h5 className="font-600 text-white mb-6">Resources</h5><p className="mb-4">Documentation</p><p className="mb-4">API Reference</p><p>Guides</p></div>
        <div><h5 className="font-600 text-white mb-6">Company</h5><p className="mb-4">About</p><p className="mb-4">Careers</p><p>Press</p></div>
        <div><h5 className="font-600 text-white mb-6">Legal</h5><p className="mb-4">Privacy</p><p className="mb-4">Terms</p><p>Security</p></div>
      </div>
      <div className="bordt pt-10 text-center mini-text text-gray">© 2026 Generic Dashboard. All rights reserved.</div>
    </footer>`,
};

export const generateItemCode = (item = {}, section = {}) => {
  const badge = item.badge || "Variant";
  const title = item.title || section.title || "Section";
  const desc = item.desc || "";
  const type = section.type || "website";
  const imgStr = typeof item.image === "string" ? item.image : "DSBKO";
  const compName = `${title.replace(/[^a-zA-Z0-9]/g, "")}${badge.replace(/[^a-zA-Z0-9]/g, "")}`;
  
  const templateFn = SECTION_TEMPLATES[type] || SECTION_TEMPLATES.website;
  const innerJSX = templateFn({ title, badge, img: imgStr, desc });

  return `// ${title} (${badge}) - ${type.toUpperCase()} Component
import React from "react";
import Image from "../../components/common/Image";
import { resolveImagePath } from "../../utils/imageResolver";

export default function ${compName}({
  title = "${title}",
  badge = "${badge}",
}) {
  return (
${innerJSX}
  );
}`;
};

export const generateSectionCode = (section = {}) => {
  const title = section.title || "Section";
  const type = section.type || "website";
  const compName = `${title.replace(/[^a-zA-Z0-9]/g, "")}Section`;
  
  return `// ${title} - All Variants Layout
import React from "react";
import Image from "../../components/common/Image";
import { resolveImagePath } from "../../utils/imageResolver";

export default function ${compName}() {
  return (
    <section className="w-full py-12 px-6 space-y-12">
      <div className="border-b pb-8">
        <h2 className="headmini-text font-700 text-dark">${title}</h2>
        <p className="mini-text text-gray mt-2">${section.subtitle || ""}</p>
      </div>
      <div className="grid-cols-3 gap-12">
        ${(section.items || []).map((item) => `
        <div className="p-8 border rounded-5 bg-white">
          <Image src={resolveImagePath("${typeof item.image === "string" ? item.image : "DSBKO"}")} alt="${item.badge || "Variant"}" className="w-full h-160 object-contain rounded-5 bg-dark p-6" />
          <h4 className="small-text font-600 text-dark mt-6">${item.badge || "Variant"}</h4>
        </div>`).join("\n        ")}
      </div>
    </section>
  );
}`;
};

const RAW_SECTIONS_DATA = [
  {
    type: "website",
    title: "Website Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      { image: DSBKO, badge: "Variant B" },
      { image: SPLEDO, badge: "Variant C" },
      { image: ENGIN, badge: "Variant D" },
      { image: NEXTG, badge: "Variant E" },
      { image: GOLDN, badge: "Variant F" },
      { image: MEDOX, badge: "Variant G" },
      { image: SPRIT, badge: "Variant H" },
      { image: LUMIN, badge: "Variant I" },
      { image: IMSALE, badge: "Variant L" },
      { image: KAIOM, badge: "Variant M" },
      { image: TOFFE, badge: "Variant P" },
    ],
  },
  {
    type: "hero",
    title: "Hero Banner Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "Mask1.png",
        badge: "Variant A",
      },
      { image: import.meta.env.VITE_IMAGE + "Mask2.png", badge: "Variant B" },
      { image: import.meta.env.VITE_IMAGE + "Mask3.png", badge: "Variant C" },
      {
        image: import.meta.env.VITE_IMAGE + "Box1.png",
        badge: "Variant D",
      },
      { image: import.meta.env.VITE_IMAGE + "Box2.png", badge: "Variant E" },
      { image: import.meta.env.VITE_IMAGE + "Box3.png", badge: "Variant F" },
      {
        image: import.meta.env.VITE_IMAGE + "Swipe1.png",
        badge: "Variant G",
      },
      { image: import.meta.env.VITE_IMAGE + "Swipe2.png", badge: "Variant H" },
    ],
  },
  {
    type: "banner",
    title: "Banner Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "Banner1.png",
        badge: "Variant A",
      },
      {
        image: import.meta.env.VITE_IMAGE + "Banner2.png",
        badge: "Variant B",
      },
      {
        image: import.meta.env.VITE_IMAGE + "Banner3.png",
        badge: "Variant C",
      },
    ],
  },
  {
    type: "about",
    title: "About Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "About1.png",
        badge: "Variant A",
      },
      {
        image: import.meta.env.VITE_IMAGE + "About2.png",
        badge: "Variant B",
      },
      {
        image: import.meta.env.VITE_IMAGE + "About3.png",
        badge: "Variant C",
      },
    ],
  },
  {
    type: "category",
    title: "Category Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      { image: import.meta.env.VITE_IMAGE + "Cat1.png", badge: "Variant A" },
      { image: import.meta.env.VITE_IMAGE + "Cat2.png", badge: "Variant B" },
      { image: import.meta.env.VITE_IMAGE + "Cat3.png", badge: "Variant C" },
    ],
  },
  {
    type: "product",
    title: "Product Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "Product1.png",
        badge: "Variant A",
      },
      {
        image: import.meta.env.VITE_IMAGE + "Product2.png",
        badge: "Variant B",
      },
      {
        image: import.meta.env.VITE_IMAGE + "Product3.png",
        badge: "Variant C",
      },
      {
        image: import.meta.env.VITE_IMAGE + "Product4.png",
        badge: "Variant D",
      },
    ],
  },
  {
    type: "offer",
    title: "Offer Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      { image: import.meta.env.VITE_IMAGE + "Offer1.png", badge: "Variant A" },
      { image: import.meta.env.VITE_IMAGE + "Offer2.png", badge: "Variant B" },
      { image: import.meta.env.VITE_IMAGE + "Offer3.png", badge: "Variant C" },
    ],
  },
  {
    type: "compare",
    title: "Compare Section",
    subtitle:
      "High-impact header banner layouts with live headlines, CTA triggers, and live metrics",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "Compare1.png",
        badge: "Variant A",
      },
    ],
  },
  {
    type: "features",
    title: "Feature Grid Section",
    subtitle:
      "Multi-column value proposition blocks with icons, typography, and visual showcases",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "Feature1.png",
        badge: "Variant A",
      },
    ],
  },
  {
    type: "metrics",
    title: "Metrics & Statistics Section",
    subtitle:
      "Telemetry KPI overview counters with comparative growth indicators and telemetry data",
    items: [
      {
        image: NEXTG,
        title: "Live KPI & Metric Counter Row",
        desc: "Clean horizontal telemetry bar displaying verified numbers, growth rates, and customer milestone counts.",
        badge: "Variant A",
        tag: "Metric Counters",
        specs: "4-Column KPIs • Live Data",
      },
      {
        image: GOLDN,
        title: "Industrial Capacity & Stats Showcase",
        desc: "Comprehensive performance overview with key operational metrics, capability indicators, and highlights.",
        badge: "Variant B",
        tag: "Performance KPIs",
        specs: "Feature KPIs • High Impact",
      },
    ],
  },
  {
    type: "testimonials",
    title: "Customer Testimonials Section",
    subtitle:
      "Social proof quotes, client ratings, author avatars, and attribution badges",
    items: [
      { image: import.meta.env.VITE_IMAGE + "Review1.png", badge: "Variant A" },
    ],
  },
  {
    type: "contact",
    title: "Contact Section",
    subtitle:
      "Customer inquiry forms, support channels, and enterprise communication touchpoints",
    items: [
      {
        image: import.meta.env.VITE_IMAGE + "Contact1.png",
        badge: "Variant A",
      },
      {
        image: import.meta.env.VITE_IMAGE + "Contact2.png",
        badge: "Variant B",
      },
    ],
  },
  {
    type: "patch",
    title: "Patch Section",
    subtitle:
      "Trust seals, compliance badges, security verified ribbons, and partner badges",
    items: [
      { image: import.meta.env.VITE_IMAGE + "Patch1.png", badge: "Variant A" },
      { image: import.meta.env.VITE_IMAGE + "Patch2.png", badge: "Variant B" },
    ],
  },
  {
    type: "faq",
    title: "FAQ & Support Section",
    subtitle: "Collapsible question-and-answer knowledge base for user support",
    items: [
      {
        image: LUMIN,
        title: "Technical Support & FAQ Hub",
        desc: "Searchable technical help center section with collapsible answers, service categories, and direct contact.",
        badge: "Variant A",
        tag: "Knowledge Base",
        specs: "Collapsible • Support Hub",
      },
    ],
  },
  {
    type: "cta",
    title: "Call To Action (CTA) Banner",
    subtitle:
      "High-conversion lead capture form with headline, search/input, and immediate submission",
    items: [
      { image: import.meta.env.VITE_IMAGE + "CTA1.png", badge: "Variant A" },
    ],
  },
  {
    type: "footer",
    title: "Footer Section",
    subtitle:
      "Enterprise site footer with multi-column sitemap links, company info, and copyright",
    items: [
      { image: import.meta.env.VITE_IMAGE + "Footer1.png", badge: "Variant A" },
      { image: import.meta.env.VITE_IMAGE + "Footer2.png", badge: "Variant B" },
    ],
  },
];

export const SECTIONS_DATA = RAW_SECTIONS_DATA.map((sec) => ({
  ...sec,
  code: sec.code || generateSectionCode(sec),
  items: (sec.items || []).map((item) => ({
    ...item,
    code: item.code || generateItemCode(item, sec),
  })),
}));

export const SIDEBAR_TO_TAB = {
  "All Sections": "all",
  Website: "website",
  "Hero Banners": "hero",
  Banners: "banner",
  About: "about",
  Category: "category",
  Product: "product",
  Offer: "offer",
  Compare: "compare",
  "Feature Grids": "features",
  "Metrics & Stats": "metrics",
  Testimonial: "testimonials",
  Contact: "contact",
  CTA: "cta",
  Patch: "patch",
  "FAQ & Support": "faq",
  Footer: "footer",
};

export const TABS = [{ name: "All Sections", value: "all" }];

const getSectionCount = (type) => {
  if (type === "all") {
    return SECTIONS_DATA.reduce(
      (acc, sec) => acc + (sec.items?.length || 0),
      0,
    );
  }
  const section = SECTIONS_DATA.find((sec) => sec.type === type);
  return section ? section.items?.length || 0 : 0;
};

const SIDEBAR_ICON_MAP = {
  "All Sections": { icon: "Grid", color: "#1e74db" },
  Website: { icon: "Layers", color: "#10b981" },
  "FAQ & Support": { icon: "Support", color: "#ec4899" },
  Footer: { icon: "Edit", color: "#6366f1" },
};

export const SIDEBAR_ITEMS = Object.entries(SIDEBAR_TO_TAB).map(([name, tabKey]) => ({
  name,
  icon: SIDEBAR_ICON_MAP[name]?.icon || "Box",
  count: getSectionCount(tabKey),
  color: SIDEBAR_ICON_MAP[name]?.color || "#10b981",
}));
