interface SectionGridProps {
  color?: string;
}

export default function SectionGrid({ color = "rgba(201, 201, 201, 0.55)" }: SectionGridProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-full max-w-7xl mx-auto h-full">
        <div
          className="h-full grid grid-cols-6"
          style={{ borderLeft: `1px solid ${color}` }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{ borderRight: `1px solid ${color}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
