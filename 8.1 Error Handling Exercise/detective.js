function mysteryOperation ()
{
	const outcome = Math.random(); // Generates a random number between 0 and 1.

	if (outcome < 0.5)
	{
		console.log("The operation is completed successfully!");
	}
	else
	{
		throw new Error("The operation is failed mysteriously!");
	}
}

const daysOfVacationForSuccess = 13;
const daysOfVacationForFailure = 1;
const daysOfVacationForAttendance = 3;

const numberOfMissions = 20;

function calculateDaysOfVacation ()
{
	let daysOfVacation = 0;

	for (let i = 0; i < numberOfMissions; i++)
	{
		try 
		{
			mysteryOperation();
			daysOfVacation += daysOfVacationForSuccess;
		}
		catch (error)
		{
			daysOfVacation += daysOfVacationForFailure;
		}
		finally
		{
			daysOfVacation += daysOfVacationForAttendance;
		}
	}

	return daysOfVacation;
}

let daysOfVacation = calculateDaysOfVacation();
console.log(`You have ${daysOfVacation} days of vacation.`);