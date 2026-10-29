import TextLink from "@/components/ui/text-link";

import { cn } from "@/lib/cn";

interface AuthPromptProps {
  text: string;
  linkText: string;
  href: string;
  className?: string;
}

/** A short question with a link, e.g. "Not a member? Register now". */
export default function AuthPrompt({
  text,
  linkText,
  href,
  className,
}: AuthPromptProps) {
  return (
    <p className={cn("text-center text-sm text-muted", className)}>
      {text} <TextLink href={href}>{linkText}</TextLink>
    </p>
  );
}
