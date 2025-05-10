// Dowry Calculator

const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');

calculateBtn.addEventListener('click', calculateDowry);

function calculateDowry() {
  let basePrice = 100;

  // 1. Education
  const educationCoeff = parseFloat(document.getElementById('education').value);

  // 2. Net worth
  const networthCoeff = parseFloat(document.getElementById('networth').value);

  // 3. Caste (flat value)
  const casteBonus = parseInt(document.getElementById('caste').value);

  // 4. Skills (sum all checked)
  const skillsCheckboxes = document.querySelectorAll('.skills');
  let skillsBonus = 0;
  skillsCheckboxes.forEach(cb => {
    if (cb.checked) {
      skillsBonus += parseInt(cb.value);
    }
  });

  // 5. Age
  const ageRadios = document.getElementsByName('age');
  let ageCoeff = 1;
  ageRadios.forEach(r => {
    if (r.checked) {
      ageCoeff = parseFloat(r.value);
    }
  });

  // 6. Reputation (coefficients and flat deductions)
  const reputationChecks = document.querySelectorAll('.reputation');
  let reputationCoeff = 1;
  reputationChecks.forEach(cb => {
    if (cb.checked) {
      reputationCoeff *= parseFloat(cb.value);
    }
  });

  const reputationFlatChecks = document.querySelectorAll('.reputationFlat');
  let reputationFlatDeduction = 0;
  reputationFlatChecks.forEach(cb => {
    if (cb.checked) {
      reputationFlatDeduction += parseInt(cb.value);
    }
  });

  // FINAL CALCULATION
  let finalPrice = basePrice * educationCoeff * networthCoeff * ageCoeff * reputationCoeff;
  finalPrice += casteBonus + skillsBonus + reputationFlatDeduction;

  // Ensure price is not negative
  if (finalPrice < 0) finalPrice = 0;

  // DOM MANIPULATIONS:
  result.textContent = `The calculated dowry price is: $${finalPrice.toFixed(2)}`;

  // Extra DOM Manipulation (CSS change based on price)
  if (finalPrice >= 300) {
    result.style.color = 'green';
  } else if (finalPrice >= 150) {
    result.style.color = 'orange';
  } else {
    result.style.color = 'red';
  }

  // Extra DOM Manipulation (button text change)
  calculateBtn.textContent = "Recalculate Dowry";
}