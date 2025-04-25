
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, HelpCircle } from "lucide-react";

const StaffTrainingHelp = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Staff Training & Help
        </CardTitle>
        <CardDescription>
          Quick reference guides for staff handling deposits and payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="refund-decision-tree">
            <AccordionTrigger>Refund Decision Tree</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Follow this decision tree to determine if a deposit should be refunded:
                </p>
                
                <div className="bg-muted p-4 rounded-lg text-sm space-y-3">
                  <div>
                    <strong>1. Check the refund deadline</strong>
                    <p className="ml-4 mt-1">
                      • Is the cancellation more than 48 hours before the scheduled move time?
                      <br />
                      • <span className="text-green-600 font-medium">YES</span> → Process refund automatically
                      <br />
                      • <span className="text-red-600 font-medium">NO</span> → Go to step 2
                    </p>
                  </div>
                  
                  <div>
                    <strong>2. Check for special circumstances</strong>
                    <p className="ml-4 mt-1">
                      • Medical emergency (with documentation)
                      <br />
                      • Extreme weather event
                      <br />
                      • Service area change
                      <br />
                      • Company scheduling error
                      <br />
                      • <span className="text-amber-600 font-medium">ANY TRUE</span> → Request admin override
                    </p>
                  </div>
                  
                  <div>
                    <strong>3. Document override reason</strong>
                    <p className="ml-4 mt-1">
                      Always document the specific reason for any refund override in the system
                    </p>
                  </div>
                </div>
                
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Any refund issued after the 48-hour deadline requires admin authorization.
                    Never promise a refund to customers without checking the deadline first.
                  </AlertDescription>
                </Alert>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="crew-tip-faq">
            <AccordionTrigger>Crew Tip FAQ</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">How are tips distributed?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      All tips are divided equally among the crew members who worked on a specific job,
                      regardless of position or seniority.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">When are tips paid out?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tips are processed automatically through our system and paid out with the next 
                      regular paycheck. Digital tip receipts are sent to crew members.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">What if a customer wants to tip specific crew members differently?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our policy is equal distribution, but for cash tips given directly to specific 
                      crew members, those can be kept individually. Digital tips through our system 
                      are always split equally.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Are customers required to tip?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tipping is always optional. While appreciated, crews are compensated fairly 
                      regardless of tips. Never pressure customers about tipping.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">What is the average tip?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The average tip is 15-20% of the total move cost, but any amount is appreciated.
                      Our system suggests 15%, 20%, or 25% but also allows custom amounts.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="payment-terms">
            <AccordionTrigger>Payment Terms</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Payment terms to explain to customers:
                </p>
                
                <div className="bg-muted p-4 rounded-lg text-sm space-y-3">
                  <div>
                    <strong>Deposit Policy</strong>
                    <ul className="mt-1 ml-4 list-disc">
                      <li>$100 deposit required to secure booking</li>
                      <li>Deposit is fully refundable if cancelled more than 48 hours before scheduled move</li>
                      <li>Deposit becomes non-refundable within 48 hours of scheduled move</li>
                      <li>Special circumstances may qualify for exceptions (requires management approval)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <strong>Final Payment</strong>
                    <ul className="mt-1 ml-4 list-disc">
                      <li>Balance is due at completion of move</li>
                      <li>We accept all major credit/debit cards</li>
                      <li>Payment options include online portal or payment to crew lead on-site</li>
                      <li>Receipts are provided via email immediately after payment processing</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium">Tip Disclosure Statement</h4>
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    "Tips are greatly appreciated but never expected or required. If you choose to tip, 
                    100% of the tip amount is distributed equally among all crew members who worked on
                    your move. Thank you for considering our hardworking team."
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default StaffTrainingHelp;
