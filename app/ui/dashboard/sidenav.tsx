import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gradient-to-br from-red-950 via-green-950 to-blue-950 text-white">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-white/5 border border-white/10 p-4 md:h-40 backdrop-blur-sm hover:bg-white/10 transition-colors"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-white/5 md:block"></div>
      </div>
    </div>
  );
}
