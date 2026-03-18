import { useState, useRef, useCallback, useEffect } from "react";

function generateChallenge() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b}`, answer: a + b };
}

export function useAntiBot() {
  const [honeypot, setHoneypot] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [challenge, setChallenge] = useState(generateChallenge);
  const mountTime = useRef(Date.now());

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  const refreshChallenge = useCallback(() => {
    setChallenge(generateChallenge());
    setCaptchaInput("");
  }, []);

  const validate = useCallback((): string | null => {
    // Honeypot filled → bot
    if (honeypot) return "__silent__";

    // Submitted too fast (< 3s) → bot
    if (Date.now() - mountTime.current < 3000) return "__silent__";

    // Math CAPTCHA
    if (parseInt(captchaInput, 10) !== challenge.answer) {
      return "Vérification anti-bot incorrecte. Veuillez réessayer.";
    }

    return null;
  }, [honeypot, captchaInput, challenge.answer]);

  return {
    honeypot,
    setHoneypot,
    captchaInput,
    setCaptchaInput,
    challenge,
    refreshChallenge,
    validate,
  };
}
