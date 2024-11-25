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
          src="https://cdn.glitch.global/ed49bbeb-c96f-423f-92ad-bd1764214e42/44.svg"
          alt="Logo"
          width={55}
          height={55}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold">Construtor de Fluxo - Hello Bot</h1>
      </div>
    </header>
  )
}
// PS C:\Users\adema\OneDrive\Documentos\BACKUP\OTHERS\ABACATE\DEV\DRAG_DROP_FLOW_HELLO_BOT>
// https://www.adobe.com/express/feature/image/convert/png-to-svg
//https://www.figma.com/design/IiscOIQqa3uVO8YBRvVJFL/ABACATE-SITE?node-id=27-659&node-type=frame&t=kD5zUA58AriN0nIQ-0
//https://glitch.com/edit/#!/peat-sage-lemur?path=README.md%3A1%3A0