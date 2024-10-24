import { XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, type FC, type ReactNode } from "react"
import { classNames } from "~/utils/class-names"

interface DrawerProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  className?: string
}

const Drawer: FC<DrawerProps> = ({
  children,
  className,
  isOpen,
  setIsOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <main
      className={classNames(
        "fixed inset-0  transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out",
        isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500"
          : " translate-x-full opacity-0 transition-all duration-500",
        className ?? ""
      )}
      style={{
        zIndex: 1001,
      }}
    >
      <section
        className={
          " absolute right-0 h-full w-screen max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative flex h-full w-screen max-w-lg flex-col space-y-6 pb-10">
          <header className="flex justify-end items-center px-4 pt-6 text-lg font-bold">
            <XMarkIcon
              className="cursor-pointer h-8 w-8"
              onClick={() => setIsOpen(false)}
            />
          </header>
          <div className="px-4">{children}</div>
        </article>
      </section>
      <section
        className="h-full w-screen cursor-pointer "
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}

export default Drawer