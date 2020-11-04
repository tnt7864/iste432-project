const test = require('ava');
const { createTestDb } = require('./util/db');

const testUserObj = {
	name: "Test user",
	email: "test@aol.com",
	username: "testuser",
	password: "pass"
};

test('insert into users', async t => {
	const db = await createTestDb();
	
	const res = await db.Users.create(testUserObj);
	
	t.is(res, 1);
});

test('readWhere from users', async t => {
	const db = await createTestDb();
	
	await db.Users.create(testUserObj);
	
	const res = await db.Users.readWhere(testUserObj);
	
	t.is(res.length, 1);
	t.like(res[0], testUserObj);
});

test('readWhere from users with partial params', async t => {
	const db = await createTestDb();
	
	await db.Users.create(testUserObj);
	
	const res = await db.Users.readWhere({
		username: "testuser"
	});
	
	t.is(res.length, 1);
	t.like(res[0], testUserObj);
});

test('readWhere from users that gets nothing', async t => {
	const db = await createTestDb();
	
	await db.Users.create(testUserObj);
	
	const res = await db.Users.readWhere({
		username: "notarealuser"
	});
	
	t.is(res.length, 0);
});

test('update', async t => {
	const db = await createTestDb();
	
	await db.Users.create(testUserObj);
	
	const resuser = await db.Users.readWhere(testUserObj);
	
	const didupdate = await db.Users.update({
		UserID: resuser[0].UserID,
		username: "newusername"
	});
	t.is(didupdate, 1);
	
	const altereduser = await db.Users.readWhere({
		username: "newusername"
	});
	t.is(altereduser.length, 1);
	t.like(altereduser[0], {
		username: "newusername",
		email: "test@aol.com" //make sure it's the same one
	});
});
