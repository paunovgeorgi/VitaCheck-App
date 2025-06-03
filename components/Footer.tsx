const currentYear = new Date().getFullYear();
const Footer = () => {

  return (
       <footer className="py-8 bg-secondary/20 text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>
          &copy; {currentYear} VitaCheck. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer