const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function isPositiveInteger(value) {
	return Number.isFinite(value) && value > 0;
}

function isNonEmptyString(value) {
	return typeof value === "string" && value.trim() !== "";
}

function getAccountById (id)
{
	if (!isPositiveInteger(id))
	{
		throw new Error("The account ID has to be a positive integer.");
	}

	for (const account of accounts)
	{
		if (account.id === id)
		{
			return account;
		}
	}
}

function createAccount (newAccountId, newAccountOwner)
{
	const account = getAccountById(newAccountId);

	if (account)
	{
		throw new Error("Account already exists.");
	}

	if (!isPositiveInteger(newAccountId))
	{
		throw new Error("The account ID has to be a positive integer.");
	}

	if (!isNonEmptyString(newAccountOwner))
	{
		throw new Error("The account owner has to be a non-empty string.");
	}

	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found");
	}

	if (!isPositiveInteger(amount))
	{
		throw new Error("The deposit amount has to be a positive integer.");
	}

	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}

	if (!isPositiveInteger(amount))
	{
		throw new Error("The withdrawal amount has to be a positive integer.");
	}

	if (account.balance < amount)
	{
		throw new Error("Insufficient funds in account for withdrawal.");
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("Source account not found.");
	}

	if (!toAccount)
	{
		throw new Error("Destination account not found.");
	}

	if (!isPositiveInteger)
	{
		throw new Error("The transfer amount has to be a positive integer.");
	}

	if (fromAccount.balance < amount)
	{
		throw new Error("Insufficient funds to complete transfer.");
	}

	fromAccount.balance -= amount;
	toAccount.balance += amount;
}

/*
Hints:

let account = getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/