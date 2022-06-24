import { Logo } from "./Logo"

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-center p-2 py-8 max-w-5xl mx-auto">
      <div className="w-[240px] md:w-full">
        <Logo />
      </div>
    </header>
  )
}