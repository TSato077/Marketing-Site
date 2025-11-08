const formatSuccessMessage = (form: HTMLFormElement, successContainer: HTMLElement) => {
	const formData = new FormData(form);
	const fullName = (formData.get('fullName') as string) || '';
	const date = formData.get('date') as string;
	const time = formData.get('time') as string;
	const firstName = fullName.trim().split(' ')[0] || 'there';

	successContainer.querySelector('[data-success-name]')!.textContent = firstName;
	successContainer.querySelector('[data-success-datetime]')!.textContent = [date, time].filter(Boolean).join(' at ');
};

const togglePolicyState = (form: HTMLFormElement, policy: HTMLInputElement, payButton: HTMLButtonElement) => {
	const isChecked = policy.checked;
	payButton.disabled = !isChecked;
	payButton.setAttribute('aria-disabled', (!isChecked).toString());
};

export const initBookingForm = () => {
	const form = document.querySelector<HTMLFormElement>('[data-booking-form]');
	const successContainer = document.querySelector<HTMLElement>('[data-booking-success]');
	const payButton = document.querySelector<HTMLButtonElement>('[data-pay-button]');
	const policy = document.querySelector<HTMLInputElement>('#booking-policy');

	if (!form || !successContainer || !payButton || !policy) return;

	togglePolicyState(form, policy, payButton);

	policy.addEventListener('change', () => togglePolicyState(form, policy, payButton));

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		formatSuccessMessage(form, successContainer);
		form.classList.add('hidden');
		successContainer.classList.remove('hidden');
		successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
	});
};

export default initBookingForm;

