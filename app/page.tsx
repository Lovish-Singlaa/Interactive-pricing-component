"use client"
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(2)
  const [isYearly, setIsYearly] = useState(false)

  const pricingTiers = [
    { pageviews: "10K", price: 8 },
    { pageviews: "50K", price: 12 },
    { pageviews: "100K", price: 16 },
    { pageviews: "500K", price: 24 },
    { pageviews: "1M", price: 36 },
  ]

  const currentTier = pricingTiers[sliderValue]
  const yearlyDiscount = 0.25 // 25% discount
  const finalPrice = isYearly ? currentTier.price * (1 - yearlyDiscount) : currentTier.price

  // Calculate slider background gradient percentage
  const percentage = (sliderValue / (pricingTiers.length - 1)) * 100

  return (
    <div className={`relative h-screen font-semibold text-[15px] ${isDarkMode && "bg-gray-900"}`}>
      <Button onClick={()=>setIsDarkMode(!isDarkMode)} className={`rounded-full absolute right-0 m-2 z-10 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}>{isDarkMode ? <Moon/> : <Sun/>}</Button>
      <div style={{ backgroundImage: !isDarkMode ? "url(/bg-pattern.svg)" : "" }} className={`absolute bg-cover bg-center w-full h-[50vh] z-0`}></div>
      <div style={{ backgroundImage: "url(/pattern-circles.svg)" }} className={`absolute bg-cover w-[13vw] h-[26vh] left-5/12 top-10 z-0 text-white`}></div>
      <div className=" relative top-28 flex flex-col items-center justify-center z-10">
        <h1 className={`text-2xl font-extrabold ${isDarkMode ? "text-white" : "text-[hsl(227,35%,25%)]"}`}>Simple, traffic-based pricing</h1>
        <p className={`${isDarkMode ? "text-gray-400" : "text-[hsl(225,20%,60%)]"}`}>Sign-up for our 30-day trial. No credit card required.</p>
      </div>

      {/* Card */}
      <div className={`p-3 relative ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-[hsl(225,20%,60%)]"} top-1/4 mx-auto w-[100vh] h-[60vh] rounded-2xl shadow-xl hover:shadow-2xl`}>
        <div className="flex justify-between items-center">
          <div className="mt-5 ml-12">{currentTier.pageviews} PAGEVIEWS</div>
          <div className="mt-5 mr-12 flex items-center gap-1">
            <span className={`font-extrabold text-5xl ${isDarkMode ? "text-white" : "text-[hsl(227,35%,25%)]"}`}>
              ${finalPrice}.00
              </span>
              <span>/month</span>
          </div>
        </div>
        <div className="relative mb-12 mt-8 flex justify-center w-[70%] mx-auto">
          <input type="range"
            min="0"
            max={pricingTiers.length - 1}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number.parseInt(e.target.value))}
            className="w-full h-2 appearance-none bg-gradient-to-r from-[#a5f3eb] to-[#a5f3eb] bg-no-repeat rounded-full outline-none cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #a5f3eb 0%, #a5f3eb ${percentage}%, #eaeefb ${percentage}%, #eaeefb 100%)`,
            }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-[#10d5c2] rounded-full shadow-lg flex items-center justify-center hover:bg-[#7aeadf]"
            style={{ left: `calc(${percentage}% - 20px)` }}
          >
            <img src="/icon-slider.svg" alt="Slider" width="22" height="13" />
          </div>

        </div>
        <div className="flex justify-center items-center gap-4">
          <div>Monthly Billing</div>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-[hsl(174,86%,45%)]"/>
          <div>Yearly Billing <span className="py-1 px-2 rounded-2xl" style={{ color: "hsl(15, 100%, 70%)", backgroundColor: "hsl(14, 92%, 95%)" }}>25% discount</span></div>
        </div>
        <hr className="mt-10 mb-5 w-[85%] mx-auto"/>
        <div className="flex justify-around gap-20">
          <ul>
            <li className="flex gap-4"><Image src="/icon-check.svg" alt="icon-check" width={17} height={1}></Image><p>Unlimited websites</p></li>
            <li className="flex gap-4"><Image src="/icon-check.svg" alt="icon-check" width={17} height={1}></Image><p>100% data ownership</p></li>
            <li className="flex gap-4"><Image src="/icon-check.svg" alt="icon-check" width={17} height={1}></Image><p>Email reports</p></li>
          </ul>
          <Button className={`rounded-full px-6 ${isDarkMode ? "text-black bg-[hsl(174,86%,45%)]" : "text-[hsl(226,100%,87%)] bg-[hsl(227,35%,25%)]"}`}>Start my trial</Button>
        </div>
      </div>
    </div>
  );
}
