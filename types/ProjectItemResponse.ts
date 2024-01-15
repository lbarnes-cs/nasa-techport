type Country = {
  abbreviation: string;
  countryId: number;
  name: string;
};

type StatesWithWork = {
  abbreviation: string;
  country: Country;
  countryId: number;
  name: string;
  stateTerritoryId: number;
};

type StateTerritory = {
  abbreviation: string;
  country: Country;
  countryId: number;
  name: string;
  stateTerritoryId: number;
};

type PrimaryTaxonomyNode = {
  taxonomyNodeId: number;
  taxonomyRootId: number;
  level: number;
  code: string;
  title: string;
  definition: string;
  hasChildren: boolean;
  hasInteriorContent: boolean;
};

type AdditionalTaxonomyNode = {
  taxonomyNodeId: number;
  taxonomyRootId: number;
  level: number;
  code: string;
  title: string;
  definition: string;
  hasChildren: boolean;
  hasInteriorContent: boolean;
};

type LkuCodeType = {
  codeType: string;
  description: string;
};

type Destination = {
  lkuCodeId: number;
  code: string;
  description: string;
  lkuCodeTypeId: number;
  lkuCodeType: LkuCodeType;
};

type PrincipalInvestigator = {
  contactId: number;
  canUserEdit: boolean;
  displayOrder: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameInverted: string;
  primaryEmail: string;
  publicEmail: boolean;
  nacontact: boolean;
};

type ProgramManager = {
  contactId: number;
  canUserEdit: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameInverted: string;
  middleInitial: string;
  primaryEmail: string;
  publicEmail: boolean;
  nacontact: boolean;
};

type ProjectManager = {
  contactId: number;
  canUserEdit: boolean;
  displayOrder: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameInverted: string;
  primaryEmail: string;
  publicEmail: boolean;
  nacontact: boolean;
  middleInitial?: string;
};

type FileObjectType = {
  lkuCodeId: number;
  code: string;
  description: string;
  lkuCodeTypeId: number;
  lkuCodeType: LkuCodeType;
};

type FileSummary = {
  fileExtension: string;
  fileId: number;
  fileSizeString: string;
};

type File = FileSummary & {
  fileName: string;
  fileSize: number;
  objectId: number;
  objectType: FileObjectType;
  objectTypeId: number;
};

type LibraryItemContentType = {
  lkuCodeId: number;
  code: string;
  description: string;
  lkuCodeTypeId: number;
  lkuCodeType: LkuCodeType;
};

type LibraryItem = {
  caption: string;
  file: File;
  files: File[];
  id: number;
  title: string;
  description: string;
  libraryItemTypeId: number;
  projectId: number;
  primary: boolean;
  publishedDateString: string;
  contentType: LibraryItemContentType;
};

type PrimaryImage = {
  file: FileSummary;
  id: number;
  description: string;
  projectId: number;
  publishedDateString: string;
};

type ResponsibleMd = {
  acronym: string;
  canUserEdit: boolean;
  city: string;
  external: boolean;
  linkCount: number;
  organizationId: number;
  organizationName: string;
  organizationType: string;
  naorganization: boolean;
  organizationTypePretty: string;
};

type ParentProgram = {
  acronym: string;
  active: boolean;
  programId: number;
  responsibleMd: ResponsibleMd;
  responsibleMdId: number;
  title: string;
};

type Program = {
  acronym: string;
  active: boolean;
  description: string;
  parentProgram: ParentProgram;
  parentProgramId: number;
  programId: number;
  responsibleMd: ResponsibleMd;
  responsibleMdId: number;
  title: string;
};

type LeadOrganization = {
  acronym: string;
  canUserEdit: boolean;
  city: string;
  country: Country;
  countryId: number;
  external: boolean;
  linkCount: number;
  organizationId: number;
  organizationName: string;
  organizationType: string;
  stateTerritory: StateTerritory;
  stateTerritoryId: number;
  naorganization: boolean;
  organizationTypePretty: string;
};

export type ProjectItemType = {
  acronym: string;
  projectId: number;
  title: string;
  primaryTaxonomyNodes: PrimaryTaxonomyNode[];
  additionalTaxonomyNodes: AdditionalTaxonomyNode[];
  startTrl: number;
  currentTrl: number;
  endTrl: number;
  benefits: string;
  description: string;
  destinations: Destination[];
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  statusDescription: string;
  principalInvestigators: PrincipalInvestigator[];
  programManagers: ProgramManager[];
  projectManagers: ProjectManager[];
  website: string;
  libraryItems: LibraryItem[];
  transitions: any[];
  primaryImage: PrimaryImage;
  responsibleMd: ResponsibleMd;
  program: Program;
  leadOrganization: LeadOrganization;
  statesWithWork: StatesWithWork[];
  lastUpdated: string;
  releaseStatusString: string;
  viewCount: number;
  endDateString: string;
  startDateString: string;
};
