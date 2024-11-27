import Image from 'next/image'
import { MenuIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Image
          src="ABACATE - PRETO.svg"
          alt="Logo"
          width={70}
          height={70}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold">Construtor de Fluxo de Diálogo</h1>
      </div>
    </header>
  )
}

