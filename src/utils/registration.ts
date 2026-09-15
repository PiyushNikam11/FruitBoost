/**
 * Helper utilities for Customer Registration Step Mapping in FruitBoost application.
 *
 * Backend registrationStep represents the LAST SUCCESSFULLY COMPLETED STEP.
 *
 * registrationStep = 0 or undefined -> Next UI Step 1: Account / Initial Details
 * registrationStep = 1 -> Next UI Step 2: OTP Send / OTP Page
 * registrationStep = 2 -> Next UI Step 2: OTP Verification Page
 * registrationStep = 3 -> Next UI Step 3: Select Company Page
 * registrationStep = 4 -> Next UI Step 4: Select Location Page
 * registrationStep = 5 -> Next UI Step 5: Payment Page
 * registrationStep = 6 -> All registration steps completed -> Dashboard
 */

export function getStepFromRegistrationStep(registrationStep?: number | null): number {
  if (registrationStep === undefined || registrationStep === null) return 1;
  const stepNum = Number(registrationStep);
  if (isNaN(stepNum) || stepNum <= 0) return 1;
  if (stepNum === 1 || stepNum === 2) return 2;
  if (stepNum === 3) return 3;
  if (stepNum === 4) return 4;
  if (stepNum === 5) return 5;
  if (stepNum >= 6) return 6;
  return 1;
}

export function getRegisterUrlForRegistrationStep(registrationStep?: number | null): string {
  const targetStep = getStepFromRegistrationStep(registrationStep);
  if (targetStep >= 6) {
    return "/dashboard";
  }
  return `/register?step=${targetStep}`;
}
