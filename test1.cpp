#include<bits/stdc++.h>
using namespace std;

bool isValidChar(char c){
    if(isdigit(c)||c=='+'||c=='-'||c=='*'||c=='/'||c=='('||c==')'||c=='#'){
        return true;
    }
    else return false;
}

int priority(char op){
    if(op=='+'||op=='-') return 1;
    if(op=='*'||op=='/') return 2;
    return 0;
}

double calc(double a, double b, char op)
{
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    if (op == '/') return a / b;
    return 0;
}

int main(){
    string str;
    cin>>str;

    for(int i=0;i<str.size();i++){
        if(!isValidChar(str[i])){
            cout<<"NO";
            return 0;
        }
    }

    stack<double> nums;
    stack<char> ops;

    for(int i=0;i<str.size();i++){
        char c=str[i];

        if(isdigit(c)){
            double temp=0;
            while(i<str.size()&&isdigit(str[i])){
                temp=temp*10+(str[i]-'0');
                i++;
            }
            nums.push(temp);
            i--;
        }

        else if(c=='('){
            ops.push(c);
        }

        else if(c==')'){
            while(!ops.empty()&&ops.top()!='('){
                double b=nums.top(); nums.pop();
                double a=nums.top(); nums.pop();
                char op=ops.top(); ops.pop();
                nums.push(calc(a,b,op));
            }
            ops.pop();
        }

        else if(c=='+'||c=='-'||c=='*'||c=='/'){
            while(!ops.empty() && priority(ops.top())>=priority(c)){
                double b=nums.top(); nums.pop();
                double a=nums.top(); nums.pop();
                char op=ops.top(); ops.pop();
                nums.push(calc(a,b,op));
            }
            ops.push(c);
        }

        else if(c=='#'){
            break;
        }
    }

    while(!ops.empty()){
        double b=nums.top(); nums.pop();
        double a=nums.top(); nums.pop();
        char op=ops.top(); ops.pop();
        nums.push(calc(a,b,op));
    }

    cout<<nums.top();

    return 0;
}