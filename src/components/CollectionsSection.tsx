import type React from "react";

const CollectionsSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-helvetica-bold text-4xl md:text-6xl mb-6">
            Collections
          </h1>
          <p className="font-helvetica text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of premium content and experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Collection Card 1 */}
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-muted rounded-md mb-4"></div>
            <h3 className="font-helvetica-bold text-xl mb-2">
              Featured Collection
            </h3>
            <p className="font-helvetica text-muted-foreground mb-4">
              A carefully curated selection of our most popular items.
            </p>
            <button className="font-interstate text-primary hover:text-primary/80 transition-colors">
              View Collection →
            </button>
          </div>

          {/* Collection Card 2 */}
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-muted rounded-md mb-4"></div>
            <h3 className="font-helvetica-bold text-xl mb-2">New Arrivals</h3>
            <p className="font-helvetica text-muted-foreground mb-4">
              The latest additions to our growing collection.
            </p>
            <button className="font-interstate text-primary hover:text-primary/80 transition-colors">
              View Collection →
            </button>
          </div>

          {/* Collection Card 3 */}
          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-muted rounded-md mb-4"></div>
            <h3 className="font-helvetica-bold text-xl mb-2">Premium Series</h3>
            <p className="font-helvetica text-muted-foreground mb-4">
              Exclusive content available only to premium members.
            </p>
            <button className="font-interstate text-primary hover:text-primary/80 transition-colors">
              View Collection →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsSection;
