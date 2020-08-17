exports.createPasswordMail = (receiver, name, password) => ({
	receiver,
	subject: '[QueueOverflow] Your password has changed',
	text: '',
	html:
		'<div style="font-family: Arial, Helvetica, sans-serif;">' +
		'<div>Hello ' +
		name +
		' your password has recently changed</div>' +
		'<span>This is your new password:</span>' +
		'<span> <h3 style=" border: 1px solid #c3c3c3; display: inline; background-color: #c3c3c3; " >' +
		password +
		'</h3> </span>' +
		'<div>Please sign in with the new password and change your password</div></div>',
});

exports.createVerificationMail = (receiver, link) => ({
	receiver,
	subject: '[QueueOverflow] Activate your account',
	text: '',
	html: `
		<div>
			<div>You're almost done! There's just one more step required to verify your QueueOverflow account.</div>
			<a href="${link}">Please click this link to activate your QueueOverflow account<a/>
		</div>
		`,
});
