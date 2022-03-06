export type AmplifyDependentResourcesAttributes = {
  auth: {
    cankartdac7425b: {
      IdentityPoolId: "string";
      IdentityPoolName: "string";
      UserPoolId: "string";
      UserPoolArn: "string";
      UserPoolName: "string";
      AppClientIDWeb: "string";
      AppClientID: "string";
    };
  };
  function: {
    videogamefunc: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
  };
  storage: {
    videogamedb: {
      Name: "string";
      Arn: "string";
      StreamArn: "string";
      PartitionKeyName: "string";
      PartitionKeyType: "string";
      SortKeyName: "string";
      SortKeyType: "string";
      Region: "string";
    };
    gameImages: {
      BucketName: "string";
      Region: "string";
    };
  };
};
