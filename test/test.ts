const Get: ClassDecorator = (target: any) => {
  target.prototype.type = 'get';
};

@Get
class QueryData {
  type: string;
  constructor(public url: string) {}
}

const getData = new QueryData('xxxx');

console.log(getData.type); //get
