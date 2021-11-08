CREATE TABLE persons (
	PersonId INT NOT NULL PRIMARY KEY,
	PersonGuid VARCHAR(255),
	PersonLastModifiedUtc DATE,
	PersonFirstName VARCHAR(255),
	PersonLastName VARCHAR(255),
	PersonFullName VARCHAR(255)
);

CREATE TABLE bodies (
	BodyId INT NOT NULL PRIMARY KEY,
	BodyGuid VARCHAR(255),
	BodyLastModifiedUtc DATE,
	BodyName VARCHAR(255),
	BodyTypeId INT,
	BodyTypeName VARCHAR(255),
	BodyDescription TEXT,
	BodyNumberOfMembers INT
);

CREATE TABLE matters (
	MatterId INT NOT NULL PRIMARY KEY,
	MatterGuid VARCHAR(255),
	MatterLastModifiedUtc DATE,
	MatterName VARCHAR(255),
	MatterTypeId INT,
	MatterTypeName VARCHAR(255),
	MatterStatusId INT,
	MatterStatusName VARCHAR(255),
	MatterBodyId INT FOREIGN KEY,
	MatterBodyName VARCHAR(255),
	MatterIntroDate DATE,
	MatterAgendaDate DATE,
	MatterPassedDate DATE
);

CREATE TABLE mattersponsors (
	MatterSponsorId INT NOT NULL PRIMARY KEY,
	MatterSponsorGuid VARCHAR(255),
	MatterSponsorLastModifiedUtc DATE,
	MatterSponsorMatterId INT FOREIGN KEY,
	MatterSponsorNameId INT FOREIGN KEY,
	MatterSponsorName VARCHAR(255)
);