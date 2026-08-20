interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, subtitle, actions, children, className = "" }: CardProps) {
  return (
    <section className={`card${className ? ` ${className}` : ""}`}>
      {(title || subtitle || actions) && (
        <header className="card-header">
          <div className="card-heading">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </header>
      )}
      <div className="card-body">{children}</div>
    </section>
  );
}
