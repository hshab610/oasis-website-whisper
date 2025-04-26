
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NileDivider } from "@/components/ui/nile-divider";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, Star, Ship, Palmtree, Pyramid, Waves } from "lucide-react";
import { useState } from "react";

export function NileThemeSampler() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="card-papyrus max-w-2xl mx-auto my-8 nile-border">
      <CardHeader className="bg-gradient-to-r from-nileDeep/10 to-desertGold/10 rounded-t-lg">
        <CardTitle className="text-nile-gradient flex items-center gap-2">
          <Pyramid className="h-6 w-6 text-desertGold" />
          Nile Theme Components
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Waves className="h-5 w-5 mr-2 text-nileTeal" />
            Colors & Buttons
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="w-12 h-12 rounded bg-nileDeep flex items-center justify-center text-white text-xs">Deep</div>
            <div className="w-12 h-12 rounded bg-nileTeal flex items-center justify-center text-white text-xs">Teal</div>
            <div className="w-12 h-12 rounded bg-desertGold flex items-center justify-center text-white text-xs">Gold</div>
            <div className="w-12 h-12 rounded bg-papyrusLight border border-gray-200 flex items-center justify-center text-xs">Papyrus</div>
            <div className="w-12 h-12 rounded bg-pharaohBlue flex items-center justify-center text-white text-xs">Pharaoh</div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button className="btn-nile animate-pulse">Nile Button</Button>
            <Button className="nile-button">Enhanced Button</Button>
            <Button>Default Button</Button>
          </div>
        </div>

        <NileDivider />
        
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Ship className="h-5 w-5 mr-2 text-nileTeal" />
            Dividers & Animations
          </h3>
          <div className="space-y-6">
            <NileDivider variant="default" />
            <NileDivider variant="subtle" />
            <NileDivider variant="accent" />
            <NileDivider variant="prominent" />
            <div className="h-12 w-full animate-nileFlow rounded"></div>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between border-t border-desertGold/20 pt-4">
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-desertGold" />
                Theme Showcase
              </span>
              <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="p-6 bg-nile-water rounded-lg animate-nileFlow">
              <p className="text-center font-medium">Flowing Nile Animation</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="nile-card p-4 flex flex-col items-center">
                <Palmtree className="h-8 w-8 text-desertGold mb-2" />
                <h4 className="font-semibold">Nile Card Style</h4>
                <p className="text-sm text-center mt-2">Elegant cards with papyrus texture and golden borders</p>
              </div>
              
              <div className="bg-gradient-to-br from-nileDeep to-nileTeal/70 text-white p-4 rounded-lg flex flex-col items-center">
                <Pyramid className="h-8 w-8 text-desertGold mb-2" />
                <h4 className="font-semibold">Gradient Background</h4>
                <p className="text-sm text-center mt-2">Deep blue-green gradients inspired by the Nile</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
