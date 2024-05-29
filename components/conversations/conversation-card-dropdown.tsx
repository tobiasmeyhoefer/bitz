'use client'

import { CiMenuKebab } from 'react-icons/ci'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addConversationDelay } from '@/lib/conversations-actions'
import { ConversationType } from '@/schema'

export const ConversationCardDropwdown = ({
  conv,
  showDelay,
}: {
  conv: ConversationType
  showDelay: boolean
}) => {
  return (
    <div className="absolute right-4 top-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-20">
          {showDelay === true ? (
            <DropdownMenuItem className="cursor-pointer">
              <Select
                onValueChange={(value) => {
                  addConversationDelay(conv.id, value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="zu spät?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="5">
                    5
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="10">
                    10
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="15">
                    15
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="30">
                    30
                  </SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem className="cursor-pointer">Test2</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Test3</DropdownMenuItem>
          {/* TODO */}
          {/* <DropdownMenuItem className="cursor-pointer">Konversation löschen</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ConversationCardDropwdown
