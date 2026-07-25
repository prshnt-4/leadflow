import * as React from "react";

import { cn } from "@/lib/utils";

type ContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const DropdownContext = React.createContext<ContextType | null>(null);

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((v) => !v), []);

  return <DropdownContext.Provider value={{ isOpen, open, close, toggle }}>{children}</DropdownContext.Provider>;
};

const DropdownMenuTrigger = ({ children, asChild = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) => {
  const ctx = React.useContext(DropdownContext);

  if (!ctx) return <div {...props}>{children}</div>;

  const child = React.Children.only(children) as React.ReactElement<any>;

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    ctx.toggle();
  };

  if (asChild) {
    return React.cloneElement(child, { onClick: handle, ...child.props });
  }

  return (
    <div {...props} onClick={handle}>
      {children}
    </div>
  );
};

type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center" | "end";
};

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(({ className, align = "end", ...props }, ref) => {
  const ctx = React.useContext(DropdownContext);
  const localRef = React.useRef<HTMLDivElement | null>(null);
  const combinedRef = (node: HTMLDivElement | null) => {
    localRef.current = node;
    // @ts-ignore
    if (typeof ref === "function") ref(node);
    // @ts-ignore
    else if (ref) ref.current = node;
  };

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!localRef.current) return;
      if (e.target instanceof Node && !localRef.current.contains(e.target)) {
        ctx?.close();
      }
    }

    if (ctx?.isOpen) {
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }
    return;
  }, [ctx]);

  if (!ctx?.isOpen) return null;

  return (
    <div
      ref={combinedRef}
      data-align={align}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, onClick, ...props }, ref) => {
  return (
    <div
      ref={ref as any}
      role="menuitem"
      tabIndex={0}
      onClick={(e) => {
        onClick?.(e as any);
      }}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref as any} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref as any} className={cn("-mx-1 my-1 h-px bg-slate-200", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator };
