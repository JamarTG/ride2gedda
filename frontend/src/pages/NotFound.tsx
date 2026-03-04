import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <IconAlertTriangle className="h-7 w-7 text-warning" />
        </div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Error 404</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Page not found</h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          We couldn't find the page you're looking for. Check the URL or head back to your dashboard.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
