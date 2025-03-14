# MeetingMeter UX Improvement Instructions

## Implementation Plan

### Phase 1: Essential Clarity Improvements
1. Time Rate Indicator (Highest Priority)
   - Add below "Real time" display
   - Shows current multiplier based on participants
   - Will modify `meeting-timer.tsx` to add:
   ```typescript
   <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-md py-1 px-3 inline-block">
     Current rate: {participants}x real time
   </div>
   ```

2. Time Factor Text (High Priority)
   - Add next to "Participants" label
   - Shows direct relationship between participants and time rate
   - Will add:
   ```typescript
   <div className="flex justify-between items-center">
     <div className="text-xl font-bold">
       <Users size={24} className="text-blue-600" />
       Participants
     </div>
     <div className="text-right">
       <div className="text-sm text-orange-500">Time Factor: {participants}x</div>
       <div className="text-xs text-gray-600">Each participant adds 1x to time rate</div>
     </div>
   </div>
   ```

### Phase 2: User Education
1. Help System (Medium Priority)
   - Add info icon next to "Participants"
   - Create a tooltip component
   - Implementation in InfoTooltip.tsx

2. First-Time User Onboarding (Medium Priority)
   - Create new component: `Onboarding.tsx`
   - 4 screens with navigation
   - LocalStorage integration
   - New files needed:
     - components/Onboarding.tsx
     - components/OnboardingScreen.tsx
     - hooks/useOnboarding.ts

### Phase 3: Visual Improvements
1. Visual Connection (Lower Priority)
   - Reposition participant section closer to timer
   - Use consistent color scheme
   - Add subtle connecting elements

### Implementation Order:

1. First PR: Core Clarity (Phase 1)
   - Add Time Rate Indicator
   - Add Time Factor Text
   - Update styling for better visual hierarchy

2. Second PR: Help System
   - Create InfoTooltip component
   - Add help content
   - Implement tooltip positioning and interactions

3. Third PR: Onboarding
   - Create onboarding components
   - Implement screen navigation
   - Add localStorage integration

4. Fourth PR: Visual Refinements
   - Update layout
   - Add visual connections
   - Polish animations and transitions 