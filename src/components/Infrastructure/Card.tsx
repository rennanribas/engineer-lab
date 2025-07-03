
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  isActive: boolean;
}

export function Card({ title, description, isActive }: CardProps) {
  const cardClasses = `card-container ${isActive ? 'card-active' : ''}`;

  return (
    <div className={cardClasses}>
      <div className="card-content">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
