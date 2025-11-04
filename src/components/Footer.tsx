import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Volunteer Management Platform. Built for grassroots communities.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
