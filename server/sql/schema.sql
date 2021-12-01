CREATE TABLE persons (
	PersonId INT PRIMARY KEY,
	PersonGuid VARCHAR(255),
	PersonLastModifiedUtc DATE,
	PersonFirstName VARCHAR(255),
	PersonLastName VARCHAR(255),
	PersonFullName VARCHAR(255)
);

CREATE TABLE bodies (
	BodyId INT PRIMARY KEY,
	BodyGuid VARCHAR(255),
	BodyLastModifiedUtc DATE,
	BodyName VARCHAR(255),
	BodyTypeId INT,
	BodyTypeName VARCHAR(255),
	BodyDescription TEXT,
	BodyNumberOfMembers INT
);

CREATE TABLE matters (
	MatterId INT PRIMARY KEY,
	MatterGuid VARCHAR(255),
	MatterLastModifiedUtc DATE,
	MatterName VARCHAR(255),
	MatterTypeId INT,
	MatterTypeName VARCHAR(255),
	MatterStatusId INT,
	MatterStatusName VARCHAR(255),
	MatterBodyId INT,
	MatterBodyName VARCHAR(255),
	MatterIntroDate DATE,
	MatterAgendaDate DATE,
	MatterPassedDate DATE
);

CREATE TABLE mattersponsors (
	MatterSponsorId INT PRIMARY KEY,
	MatterSponsorGuid VARCHAR(255),
	MatterSponsorLastModifiedUtc DATE,
	MatterSponsorMatterId INT,
	MatterSponsorNameId INT,
	MatterSponsorName VARCHAR(255)
);

CREATE TABLE councilmembers (
	Name VARCHAR(255) PRIMARY KEY,
	District INT,
	Borough VARCHAR(255),
	PoliticalParty VARCHAR(255)
);

CREATE TABLE assembly (
	memberId INT PRIMARY KEY,
	incumbent BOOLEAN,
	fullName VARCHAR(255),
	imgName VARCHAR(255),
	sessionMemberId INT,
	districtCode INT
);

CREATE TABLE senate (
	memberId INT PRIMARY KEY,
	incumbent BOOLEAN,
	fullName VARCHAR(255),
	imgName VARCHAR(255),
	sessionMemberId INT,
	districtCode INT
);

CREATE TABLE vote (
	VoteId INT PRIMARY KEY,
	VotePersonName VARCHAR(255),
	VoteValueName VARCHAR(255),
	VoteEventItemId INT
);
