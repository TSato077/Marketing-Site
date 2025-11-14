type SlotCheckbox = HTMLInputElement & { dataset: { slotLabel?: string } };

const MAILTO_ADDRESS = 'tsato077@gmail.com';
const MAILTO_SUBJECT = 'Holiday Mini Session — SatoFoto';

type FormElements = {
	firstName: HTMLInputElement;
	lastName: HTMLInputElement;
	email: HTMLInputElement;
	phone: HTMLInputElement;
	familySize: HTMLInputElement;
	notes: HTMLTextAreaElement;
};

const encode = (value: string) => encodeURIComponent(value);

const buildBody = ({
	firstName,
	lastName,
	email,
	phone,
	familySize,
	slots,
	notes,
}: {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	familySize?: string;
	slots: string[];
	notes?: string;
}) => {
	const slotPlaceholders = [slots[0] ?? '—', slots[1] ?? '—', slots[2] ?? '—'];
	return (
		`First name: ${firstName || '—'}\n\n` +
		`Last name: ${lastName || '—'}\n\n` +
		`Number of family members: ${familySize || '—'}\n\n` +
		`Email: ${email || '—'}\n\n` +
		`Phone: ${phone || '—'}\n\n` +
		`Preferred date/time slots (choose up to 3):\n` +
		`1) ${slotPlaceholders[0]}\n` +
		`2) ${slotPlaceholders[1]}\n` +
		`3) ${slotPlaceholders[2]}\n\n` +
		`Questions / notes:\n${notes || '—'}\n\n` +
		'I understand payment is required to reserve a spot. Please send the invoice link to confirm my booking.'
	);
};

const openMailClient = (body: string) => {
	const mailto = `mailto:${MAILTO_ADDRESS}?subject=${encode(MAILTO_SUBJECT)}&body=${encode(body)}`;
	window.location.href = mailto;
};

const isEmailValid = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

const getSelectedSlots = (checkboxes: SlotCheckbox[]) =>
	checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.dataset.slotLabel || checkbox.value);

const initGenericTriggers = () => {
	const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-mailto-trigger]'));
	if (!triggers.length) return;

	triggers.forEach((trigger) => {
		trigger.addEventListener('click', (event) => {
			event.preventDefault();
			const body = buildBody({ slots: [] });
			openMailClient(body);
			const targetId = trigger.getAttribute('href');
			if (targetId && targetId.startsWith('#')) {
				const target = document.querySelector<HTMLElement>(targetId);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
		});
	});
};

const initReserveForm = () => {
	const form = document.querySelector<HTMLFormElement>('[data-reserve-form]');
	if (!form) return;

	const elements = form.elements as unknown as FormElements;
	const slotCheckboxes = Array.from(form.querySelectorAll<SlotCheckbox>('[data-slot-checkbox]'));
	const helper = form.querySelector<HTMLElement>('[data-slot-helper]');
	const submitButton = form.querySelector<HTMLButtonElement>('[data-submit-mailto]');

	if (!submitButton) return;

	const updateState = () => {
		const selectedSlots = getSelectedSlots(slotCheckboxes);
		const isValid =
			elements.firstName.value.trim().length > 0 &&
			elements.lastName.value.trim().length > 0 &&
			isEmailValid(elements.email.value.trim()) &&
			selectedSlots.length > 0;
		submitButton.disabled = !isValid;
	};

	slotCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', () => {
			const selectedSlots = getSelectedSlots(slotCheckboxes);
			if (selectedSlots.length > 3) {
				checkbox.checked = false;
				if (helper) {
					helper.textContent = 'Please select up to 3 preferred slots.';
					helper.classList.remove('hidden');
				}
			} else if (helper) {
				helper.textContent = 'Select up to 3 preferred slots.';
				helper.classList.add('hidden');
			}
			updateState();
		});
	});

	['input', 'blur'].forEach((eventName) => {
		elements.firstName.addEventListener(eventName, updateState);
		elements.lastName.addEventListener(eventName, updateState);
		elements.email.addEventListener(eventName, updateState);
	});

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const selectedSlots = getSelectedSlots(slotCheckboxes);
		const body = buildBody({
			firstName: elements.firstName.value.trim(),
			lastName: elements.lastName.value.trim(),
			email: elements.email.value.trim(),
			phone: elements.phone.value.trim(),
			familySize: elements.familySize.value.trim(),
			slots: selectedSlots,
			notes: elements.notes.value.trim(),
		});
		openMailClient(body);
	});

	updateState();
};

const initMailto = () => {
	if (typeof window === 'undefined') return;
	initGenericTriggers();
	initReserveForm();
};

export default initMailto;

