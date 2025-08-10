# SpineZone Component Architecture Guide
## Development Handoff for Wireframe Implementation

---

## 📋 OVERVIEW

This guide provides the technical specifications for implementing the wireframed redesign of the SpineZone website. The focus is on mobile-first development, conversion optimization, and maintainable React/Next.js components.

---

## 🗂️ COMPONENT STRUCTURE

### New Components to Create

#### 1. **TreatmentJourney.tsx**
```typescript
// New component for /treatment-journey page
interface TreatmentPhase {
  phase: string;
  title: string;
  duration: string;
  goals: string[];
  treatments: string[];
  expectedOutcomes: string;
  progressPercentage: number;
}

interface TreatmentJourneyProps {
  phases: TreatmentPhase[];
  onScheduleClick: () => void;
}
```

**Key Features:**
- Vertical timeline on mobile, horizontal on desktop
- Interactive progress indicators
- Multiple CTA placement points
- Responsive phase cards

#### 2. **PhaseTimeline.tsx**
```typescript
// Sub-component for treatment phase visualization
interface PhaseTimelineProps {
  phases: TreatmentPhase[];
  currentPhase?: number;
  interactive?: boolean;
}
```

**Design Requirements:**
- Progressive disclosure on mobile
- Hover interactions on desktop
- Visual progress bars (20%, 60%, 100%)
- Accessible navigation between phases

#### 3. **NetworkTrustIndicators.tsx**
```typescript
// Component for locations page trust signals
interface TrustIndicator {
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: string;
}

interface NetworkTrustProps {
  indicators: TrustIndicator[];
  networkStats: {
    locations: number;
    encounters: string;
    successRate: string;
    responseTime: string;
  };
}
```

#### 4. **ConditionAssessment.tsx**
```typescript
// Migrated content component for services page
interface ConditionAssessmentProps {
  title: string;
  features: string[];
  onScheduleClick: () => void;
  highlighted?: boolean;
}
```

#### 5. **InteractiveLocationMap.tsx**
```typescript
// Enhanced map component with individual CTAs
interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  availableToday: boolean;
  coordinates: [number, number];
}

interface LocationMapProps {
  locations: LocationData[];
  onLocationSelect: (locationId: string) => void;
  mapHeight: {
    mobile: string;
    desktop: string;
  };
}
```

#### 6. **TreatmentOverviewCards.tsx**
```typescript
// Replacement for detailed TreatmentOptions
interface TreatmentCard {
  title: string;
  icon: LucideIcon;
  keyBenefits: string[];
  ctaText: string;
  ctaAction: string;
}

interface TreatmentOverviewProps {
  cards: TreatmentCard[];
  layout: 'mobile-scroll' | 'tablet-2col' | 'desktop-3col';
}
```

---

## 🔄 COMPONENTS TO MODIFY

### 1. **TreatmentOptions.tsx** - Major Refactor
**Current State:** Full treatment journey + options
**New State:** Overview cards only

```typescript
// Remove these sections:
- Treatment journey timeline (move to TreatmentJourney.tsx)
- "Your Treatment Journey" detailed content
- "Not Sure Which Treatment" section (move to services page)

// Keep and enhance:
- Treatment category cards (Manual, Advanced, Exercise)
- Card-based layout with CTAs
- Mobile-first responsive grid
```

**Implementation Changes:**
```typescript
// OLD (lines 169-272 to remove)
<section className="treatment-journey">
  <h3>Your Treatment Journey</h3>
  {/* Detailed timeline content */}
</section>

// NEW (simplified overview)
<TreatmentOverviewCards 
  cards={treatmentCards}
  layout="responsive"
  onCardClick={handleCardClick}
/>
```

### 2. **LocalSEO.tsx** - Create Compact Version
**Current State:** Full network details and trust indicators
**New State:** Neighborhood links only for homepage

```typescript
// Create two variants:
interface LocalSEOProps {
  variant: 'full' | 'compact';
  showNeighborhoods: boolean;
  showNetworkDetails?: boolean; // Only for 'full' variant
}

// Homepage usage:
<LocalSEO 
  variant="compact"
  showNeighborhoods={true}
  showNetworkDetails={false}
/>

// Locations page usage:
<LocalSEO 
  variant="full"
  showNeighborhoods={true}
  showNetworkDetails={true}
/>
```

### 3. **OptimizedCTAButtons.tsx** - Update CTA Language
**Changes Required:**
```typescript
// Update all CTA variants from "consultation" to "appointment"
const ctaVariants = [
  {
    id: 'A',
    text: 'Schedule Your Appointment', // was: 'Book Free Consultation'
    subtext: 'Get personalized treatment plan'
  },
  {
    id: 'B', 
    text: 'Book Appointment Now', // was: 'Start Free Consultation'
    subtext: 'Same-day appointments available'
  },
  {
    id: 'C',
    text: 'Make an Appointment', // was: 'Get Free Assessment'
    subtext: 'Most insurance accepted'
  },
  {
    id: 'D',
    text: 'Reserve Your Appointment', // was: 'Schedule Consultation'
    subtext: '90% success rate guaranteed'
  }
];
```

### 4. **HeroSection.tsx** - Update CTA Text
```typescript
// Line 107: Update trust indicators text
<span className="text-xs sm:text-sm">
  FREE assessment • Most insurance accepted • Same-day appointments
</span>

// Update OptimizedCTAButton usage to use new variants
<OptimizedCTAButton 
  className="w-full sm:w-auto min-h-[56px]" // Increase from 48px
  variant="primary-appointment" // New variant
  onAnalytics={(variantId, action) => {
    console.log(`Hero CTA: ${variantId} - ${action}`);
  }}
/>
```

### 5. **ConditionsTreated.tsx** - Enhance Table Structure
```typescript
// Add treatment approach column to conditions data
const conditions = [
  {
    category: "Spine Conditions",
    icon: AlertCircle,
    color: "blue",
    conditions: [
      { 
        name: "Herniated Discs", 
        severity: "Common", 
        description: "Bulging or ruptured spinal discs causing nerve compression",
        treatmentApproach: "Non-invasive decompression" // NEW FIELD
      },
      // ... rest of conditions
    ]
  }
];

// Remove "Don't See Your Condition Listed?" section (lines 162-205)
// This moves to /services page
```

### 6. **FinalCTA.tsx** - Update Language
```typescript
// Update primary CTA text
const ctaText = "Make Your Appointment Today"; // was: different text
const subtitle = "Join thousands of San Diego patients who chose natural healing";
```

---

## 🌐 NEW PAGE COMPONENTS

### 1. **app/treatment-journey/page.tsx**
```typescript
import TreatmentJourney from '@/components/TreatmentJourney';
import PhaseTimeline from '@/components/PhaseTimeline';

export default function TreatmentJourneyPage() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Pain Relief & Protection",
      duration: "1-2 weeks",
      goals: ["Reduce acute pain", "Protect injured tissues", "Restore basic function"],
      treatments: ["Manual therapy", "Pain management", "Gentle mobilization"],
      expectedOutcomes: "60-80% pain reduction",
      progressPercentage: 20
    },
    // ... Phase 2 & 3 data
  ];

  return (
    <main>
      <TreatmentJourney phases={phases} />
    </main>
  );
}
```

### 2. **Enhanced app/locations/page.tsx**
```typescript
import NetworkTrustIndicators from '@/components/NetworkTrustIndicators';
import InteractiveLocationMap from '@/components/InteractiveLocationMap';

export default function LocationsPage() {
  return (
    <main>
      <HeroSection 
        title="San Diego's Most Trusted Physical Therapy Network"
        subtitle="8 locations serving San Diego & Orange County"
      />
      <NetworkTrustIndicators />
      <InteractiveLocationMap locations={locationData} />
      <LocationCards locations={locationData} />
    </main>
  );
}
```

### 3. **Enhanced app/services/page.tsx**
```typescript
import ConditionAssessment from '@/components/ConditionAssessment';
import TreatmentSelection from '@/components/TreatmentSelection';

export default function ServicesPage() {
  return (
    <main>
      <ServiceCategories />
      <ConditionAssessment 
        title="Don't See Your Condition Listed?"
        features={conditionAssessmentFeatures}
        highlighted={true}
      />
      <TreatmentSelection 
        title="Not Sure Which Treatment is Right for You?"
        process={treatmentSelectionProcess}
      />
    </main>
  );
}
```

### 4. **Enhanced app/assessment/page.tsx**
```typescript
// Add appointment booking integration to results
interface AssessmentResults {
  condition: string;
  confidence: number;
  urgencyLevel: 'high' | 'moderate' | 'low';
  treatmentPlan: string[];
  expectedTimeline: string;
  successProbability: number;
}

// Add direct scheduling widget
<AppointmentBooking 
  prefilledCondition={results.condition}
  urgencyLevel={results.urgencyLevel}
  recommendedTreatments={results.treatmentPlan}
/>
```

---

## 📱 MOBILE-FIRST IMPLEMENTATIONS

### Responsive Layout Utilities
```scss
// Tailwind classes for mobile-first approach
.mobile-stack {
  @apply flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6;
}

.treatment-card-grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3;
}

.location-card-scroll {
  @apply flex space-x-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible;
}
```

### Touch Target Specifications
```typescript
// Minimum touch target constants
export const TOUCH_TARGETS = {
  MINIMUM: '44px',
  RECOMMENDED: '48px', 
  CTA_BUTTON: '56px',
  MOBILE_NAV: '48px'
} as const;

// Usage in components
<button 
  className={`min-h-[${TOUCH_TARGETS.CTA_BUTTON}] min-w-[${TOUCH_TARGETS.CTA_BUTTON}]`}
>
  Schedule Appointment
</button>
```

### Scroll-Triggered CTA Implementation
```typescript
// Enhanced ScrollTriggeredCTA component
interface ScrollTriggeredCTAProps {
  triggers: Array<{
    elementId: string;
    threshold: number;
    text: string;
    action: string;
  }>;
  mobileStrategy: 'sticky-bottom' | 'floating-corner';
  desktopStrategy: 'floating-corner' | 'inline';
}

// Usage on homepage
<ScrollTriggeredCTA
  triggers={[
    {
      elementId: "conditions-section",
      threshold: 0.5,
      text: "Find Treatment for My Condition",
      action: "navigate:/assessment"
    },
    {
      elementId: "treatments-section", 
      threshold: 0.75,
      text: "Start My Treatment Plan",
      action: "navigate:/assessment"
    }
  ]}
  mobileStrategy="sticky-bottom"
  desktopStrategy="floating-corner"
/>
```

---

## 🎨 DESIGN SYSTEM SPECIFICATIONS

### Color Tokens
```typescript
// Update color system for new CTA hierarchy
export const COLORS = {
  primary: {
    cta: '#2563EB', // Blue - primary appointment CTAs
    hover: '#1D4ED8',
    light: '#DBEAFE'
  },
  secondary: {
    cta: '#059669', // Green - secondary CTAs
    hover: '#047857', 
    light: '#D1FAE5'
  },
  urgent: {
    cta: '#DC2626', // Red - urgent/limited CTAs
    hover: '#B91C1C',
    light: '#FEE2E2'
  }
} as const;
```

### Typography Scale
```typescript
// Responsive typography system
export const TYPOGRAPHY = {
  mobile: {
    h1: 'text-3xl font-bold leading-tight',
    h2: 'text-2xl font-bold', 
    h3: 'text-xl font-semibold',
    body: 'text-base leading-relaxed',
    cta: 'text-base font-semibold'
  },
  desktop: {
    h1: 'text-6xl font-bold leading-tight',
    h2: 'text-4xl font-bold',
    h3: 'text-2xl font-semibold', 
    body: 'text-lg leading-relaxed',
    cta: 'text-lg font-semibold'
  }
} as const;
```

### Spacing System
```typescript
// Consistent spacing for mobile-first
export const SPACING = {
  mobile: {
    section: 'py-12 px-4',
    card: 'p-4 mb-4',
    element: 'mb-4'
  },
  desktop: {
    section: 'py-16 px-6',
    card: 'p-6 mb-6', 
    element: 'mb-6'
  }
} as const;
```

---

## 🔗 ROUTING & NAVIGATION

### New Routes to Add
```typescript
// next.js app router structure
src/app/
├── treatment-journey/
│   └── page.tsx
├── locations/
│   └── page.tsx (enhanced)
├── services/
│   └── page.tsx (enhanced with migrated content)
├── assessment/
│   └── page.tsx (enhanced with booking integration)
```

### Navigation Updates
```typescript
// Update main navigation items
const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/treatment-journey', label: 'Treatment Journey' }, // NEW
  { href: '/assessment', label: 'Assessment' },
  { href: '/locations', label: 'Locations' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];

// Add prominent CTA in navigation
const navigationCTA = {
  text: 'Schedule Appointment',
  href: '/assessment',
  variant: 'primary'
};
```

---

## 📊 PERFORMANCE OPTIMIZATIONS

### Lazy Loading Strategy
```typescript
// Updated lazy loading for new components
const TreatmentJourney = dynamic(() => import('@/components/TreatmentJourney'), {
  loading: () => <div className="section-padding bg-gray-50 lazy-section" data-min-height="400px" />,
  ssr: false
});

const NetworkTrustIndicators = dynamic(() => import('@/components/NetworkTrustIndicators'), {
  loading: () => <div className="section-padding bg-white lazy-section" data-min-height="300px" />,
  ssr: false
});
```

### Critical Path Loading
```typescript
// Homepage critical path (above fold)
const CriticalComponents = [
  'HeroSection', // SSR
  'Navigation', // SSR
  'TrustIndicators' // SSR
];

// Below fold (lazy loaded)
const LazyComponents = [
  'ConditionsTreated',
  'TreatmentOverviewCards', 
  'CompactLocalSEO',
  'FAQSection',
  'Footer'
];
```

---

## 🧪 A/B TESTING HOOKS

### CTA Testing Framework
```typescript
// Built-in A/B testing for CTA variants
interface CTATestProps {
  testId: string;
  variants: Array<{
    id: string;
    text: string;
    subtext?: string;
  }>;
  onConversion: (variantId: string) => void;
}

// Usage in components
<CTATest
  testId="homepage-hero-cta"
  variants={[
    { id: 'A', text: 'Schedule Your Appointment' },
    { id: 'B', text: 'Book Appointment Now' },
    { id: 'C', text: 'Make an Appointment' }
  ]}
  onConversion={trackConversion}
/>
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Homepage Optimization
- [ ] Create TreatmentOverviewCards component
- [ ] Modify TreatmentOptions to use overview cards only  
- [ ] Update OptimizedCTAButtons with appointment language
- [ ] Create compact LocalSEO variant
- [ ] Update HeroSection CTA text
- [ ] Update FinalCTA text
- [ ] Remove treatment journey content from TreatmentOptions

### Phase 2: New Pages
- [ ] Create /treatment-journey route and page
- [ ] Create TreatmentJourney and PhaseTimeline components
- [ ] Enhance /locations page with NetworkTrustIndicators
- [ ] Create InteractiveLocationMap component
- [ ] Enhance /services page with migrated content
- [ ] Create ConditionAssessment component
- [ ] Enhance /assessment page with booking integration

### Phase 3: Mobile Optimizations
- [ ] Implement scroll-triggered CTAs
- [ ] Add sticky mobile navigation
- [ ] Ensure all touch targets meet 44px minimum
- [ ] Test responsive layouts on all breakpoints
- [ ] Implement mobile-first card grids
- [ ] Add touch feedback animations

### Phase 4: Performance & Testing
- [ ] Set up lazy loading for all below-fold components
- [ ] Implement A/B testing framework
- [ ] Add conversion tracking for new CTAs
- [ ] Monitor Core Web Vitals
- [ ] Test accessibility compliance
- [ ] Cross-browser compatibility testing

---

This component architecture guide provides the complete technical roadmap for implementing the wireframed redesign with mobile-first principles, conversion optimization, and maintainable React components.