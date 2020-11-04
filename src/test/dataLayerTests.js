const test = require('ava');
const { createTestDb } = require('./util/db');

test('insert into users', async t => {
	const db = await createTestDb();
	
	await db.Users.create({
		name: "Test user",
		email: "test@aol.com",
		username: "testuser",
		password: "pass"
	});
	
	t.pass();
});
