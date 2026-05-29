import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone, Globe } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="الشعار"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <div className="font-display text-lg font-bold">جمعية وصال الرحمة</div>
              <div className="text-sm text-muted-foreground">
                لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            منظمة غير ربحية تأسست في 8 أكتوبر 2011، تعنى بدمج وتأهيل الأطفال في وضعية إعاقة ذهنية
            بمدينة طنجة.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            روابط
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-primary">
                من نحن
              </Link>
            </li>
            <li>
              <Link to="/programmes" className="hover:text-primary">
                برامجنا
              </Link>
            </li>
            <li>
              <Link to="/partenaires" className="hover:text-primary">
                شركاؤنا
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                اتصل بنا
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            للتواصل
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>برانص 1، زنقة Z رقم 03، طنجة</span>
            </li>
            <li className="flex items-start gap-2" dir="ltr">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>+212 6 74 16 46 77</span>
            </li>
            <li className="flex items-start gap-2" dir="ltr">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>wissal.arrahma@gmail.com</span>
            </li>
            <li className="flex items-start gap-2" dir="ltr">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>www.wissalarrahma.com</span>
            </li>
            <li className="flex items-start gap-2">
              <Facebook className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Association.wissal.arrahma</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} جمعية وصال الرحمة — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
