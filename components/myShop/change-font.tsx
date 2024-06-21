import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MdOutlineEdit } from 'react-icons/md'

export function ChangeFont() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="absolute right-[-24px] top-[-16px] flex h-6 w-6 items-center justify-center bg-transparent shadow-none hover:bg-transparent">
          <p className="text-card-button hover:font-bold"> edit </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid grid-cols-4 gap-4">
            <p className="font-space_grotesk text-base"> Example </p>
            <p className="font-montserrat text-base"> Example</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
