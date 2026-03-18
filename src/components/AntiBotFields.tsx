import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, ShieldCheck } from "lucide-react";

type AntiBotFieldsProps = {
  honeypot: string;
  setHoneypot: (v: string) => void;
  captchaInput: string;
  setCaptchaInput: (v: string) => void;
  challenge: { question: string };
  refreshChallenge: () => void;
};

const AntiBotFields = ({
  honeypot,
  setHoneypot,
  captchaInput,
  setCaptchaInput,
  challenge,
  refreshChallenge,
}: AntiBotFieldsProps) => (
  <>
    {/* Honeypot — hidden from humans */}
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website_url">Ne pas remplir</label>
      <input
        id="website_url"
        name="website_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
    </div>

    {/* Math CAPTCHA */}
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <ShieldCheck size={15} className="text-primary" />
        Vérification anti-bot *
      </Label>
      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm font-semibold tracking-wide">
          {challenge.question} =
        </span>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="?"
          className="w-20"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />
        <button
          type="button"
          onClick={refreshChallenge}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-primary"
          title="Nouveau calcul"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  </>
);

export default AntiBotFields;
