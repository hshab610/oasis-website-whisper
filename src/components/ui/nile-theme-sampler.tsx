
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NileDivider } from "@/components/ui/nile-divider";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function NileThemeSampler() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="card-papyrus max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-nile-gradient">Nile Theme Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Colors & Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <div className="w-12 h-12 rounded bg-nileDeep"></div>
            <div className="w-12 h-12 rounded bg-nileTeal"></div>
            <div className="w-12 h-12 rounded bg-desertGold"></div>
            <div className="w-12 h-12 rounded bg-papyrusLight"></div>
            <div className="w-12 h-12 rounded bg-pharaohBlue"></div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button className="btn-nile">Nile Button</Button>
            <Button>Default Button</Button>
          </div>
        </div>

        <NileDivider />
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Dividers & Animations</h3>
          <div className="space-y-6">
            <NileDivider variant="default" />
            <NileDivider variant="subtle" />
            <NileDivider variant="accent" />
            <div className="h-12 w-full animate-nileFlow rounded"></div>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between">
              <span>View More Theme Components</span>
              <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="p-6 bg-nile-water rounded-lg animate-nileFlow">
              <p className="text-center font-medium">Flowing Nile Animation</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
