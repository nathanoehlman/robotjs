var test = require('tape');
var robot = require('..');
var lastKnownPos, currentPos;

//Increase delay to help test reliability.
robot.setMouseDelay(100);

test('Get the initial mouse position.', function(t)
{
	t.plan(3);
	t.ok(lastKnownPos = robot.getMousePos(), 'successfully retrieved mouse position.');
	t.ok(lastKnownPos.x !== undefined, 'mousepos.x is a valid value.');
	t.ok(lastKnownPos.y !== undefined, 'mousepos.y is a valid value.');
});

test('Move the mouse.', function(t)
{
	t.plan(6);
	lastKnownPos = robot.moveMouse(0, 0);
	t.ok(robot.moveMouse(-100, 100) === 1, 'successfully moved the mouse.');
	currentPos = robot.getMousePos();
	t.ok(currentPos.x === -100, 'mousepos.x is correct.');
	t.ok(currentPos.y === 100, 'mousepos.y is correct.');

	t.throws(function()
	{
		robot.moveMouse(0, 1, 2, 3);
	}, /Invalid number/, 'move mouse to (0, 1, 2, 3).');

	t.throws(function()
	{
		robot.moveMouse(0);
	}, /Invalid number/, 'move mouse to (0).');

	t.ok(robot.moveMouse("0", "0") === 1, 'move mouse to ("0", "0").');

});

test('Move the mouse smoothly.', function(t)
{
	t.plan(6);
	lastKnownPos = robot.moveMouseSmooth(0, 0);
	t.ok(robot.moveMouseSmooth(-100, 100) === 1, 'successfully moved the mouse.');
	currentPos = robot.getMousePos();
	t.ok(currentPos.x === -100, 'mousepos.x is correct.');
	t.ok(currentPos.y === 100, 'mousepos.y is correct.');

	t.throws(function()
	{
		robot.moveMouseSmooth(0, 1, 2, 3);
	}, /Invalid number/, 'move mouse to (0, 1, 2, 3).');

	t.throws(function()
	{
		robot.moveMouseSmooth(0);
	}, /Invalid number/, 'move mouse to (0).');

	t.ok(robot.moveMouseSmooth("0", "0") === 1, 'move mouse to ("0", "0").');

});
